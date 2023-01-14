import React, { useMemo } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './cart.module.css';
import {constructorIngredientsPropTypes} from '../../utils/proptypes';
import { useDispatch, useSelector } from 'react-redux';
import {CLOSE_ORDER_MODAL, placeOrder} from "../../services/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const { constructorIngredients, orderModal, orderFailed, orderNumber } = useSelector(state => state.cart);

  const closeOrderModal = () => {
    dispatch({
      type: CLOSE_ORDER_MODAL
    })
  }

  const countSum = (data) => {
    const { bun, filling } = data;
    let sum = 0;

    if (bun) {
      sum += bun.price*2;
    }

    if (filling.length > 0) {
      sum += filling.reduce((price, item) => price + item.price, 0);
    }

    return sum;
  }

  const orderSum = useMemo(() => {
    countSum(constructorIngredients);
  }, [constructorIngredients])

  const onOrderClick = (evt) => {
    evt.preventDefault();
    const ids = [constructorIngredients.bun['_id'], ...constructorIngredients.filling.map((item) => item['_id']), constructorIngredients.bun['_id']];
    dispatch(placeOrder(ids));
  }

  const modalContent = useMemo(
    () => {
    return orderFailed ? (
      <>
        <p className="text text_type_main-medium mb-4">Произошла ошибка.</p>
        <p className="text text_type_main-default text_color_inactive">Попробуйте повторно оформить заказ.</p>
      </>
    ) : (
      <OrderDetails number={orderNumber}/>
    );
  }, [orderFailed, orderNumber]);

  return (
    <div className={styles.container}>
      <BurgerConstructor />

      <div className={`${styles.bottom} mt-5 pr-4`}>
        <p className={`${styles.total} mr-10`}>
          <span className="text text_type_digits-medium">{orderSum}</span>
          <CurrencyIcon type={"primary"} />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {orderModal && (
        <Modal onClose={closeOrderModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  )
}

Cart.propTypes = {
  constructorIngredients: constructorIngredientsPropTypes,
}

export default Cart;