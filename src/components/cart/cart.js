import React, {useContext, useMemo, useState} from 'react';
import {ConstructorContext} from '../../services/ingredientsContext';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {placeOrderRequest} from '../../services/burger-api';
import {ApiErrorContext} from '../../services/apiErrorContext';
import styles from './cart.module.css';
import {constructorIngredientsPropTypes} from "../../utils/proptypes";

const Cart = () => {
  const { constructorIngredients } = useContext(ConstructorContext);
  const { setApiError } = useContext(ApiErrorContext);
  const [orderModal, setOrderModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [orderRequest, setOrderRequest] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);

  const showOrderModal = (evt) => {
    setOrderModal(true);
  }

  const closeOrderModal = () => {
    setOrderModal(false);
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

  const placeOrder = (evt) => {
    evt.preventDefault();
    const ids = [constructorIngredients.bun['_id'], ...constructorIngredients.filling.map((item) => item['_id']), constructorIngredients.bun['_id']];
    setOrderRequest(true);
    placeOrderRequest(ids)
      .then((res) => {
        if (res && res.success) {
          setOrderNumber(res.order.number);
          setOrderRequest(false);
          setOrderFailed(false);
        } else {
          setOrderRequest(false);
          setOrderFailed(true);
        }
        showOrderModal();
      })
      .catch((err) => {
        setApiError(err.message);
        setOrderRequest(false);
        setOrderFailed(true);
        showOrderModal();
      })
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
      <BurgerConstructor constructorIngredients={constructorIngredients} />

      <div className={`${styles.bottom} mt-5 pr-4`}>
        <p className={`${styles.total} mr-10`}>
          <span className="text text_type_digits-medium">{orderSum}</span>
          <CurrencyIcon type={"primary"} />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={placeOrder}>
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