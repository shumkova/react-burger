import React, { useMemo } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrderInfoAction, placeOrderThunk } from '../../services/actions/order';
import { decreaseIngredientAmountAction, increaseIngredientAmountAction } from '../../services/actions/ingredients';
import { addBunToConstructorAction, addFillingToConstructorAction } from '../../services/actions/burger-constructor';
import { countSum } from './cart.utils';
import { BUN } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import OrderConfirmModal from '../order-confirm-modal/order-confirm-modal';

const Cart = () => {
  const constructorIngredients = useSelector(state => state.constructorIngredients);
  const { user } = useSelector(state => state.auth);
  const { orderInfo } = useSelector(state => state.order);
  const { ingredients } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeOrderModal = () => {
    dispatch(clearOrderInfoAction());
  }

  const orderSum = useMemo(() => {
    return countSum(constructorIngredients);
  }, [constructorIngredients])

  const onOrderClick = (evt) => {
    evt.preventDefault();
    const ids = [constructorIngredients.bun._id, ...constructorIngredients.filling.map((item) => item._id), constructorIngredients.bun._id];
    user ? dispatch(placeOrderThunk(ids)) : navigate('/login');
  }

  const handleDrop = (draggableItem) => {
    dispatch(increaseIngredientAmountAction(draggableItem.id));

    const ingredient = ingredients.find((item) => item._id === draggableItem.id);

    if (ingredient.type === BUN) {
      const previousBun = ingredients.find((item) => item.type === BUN && item.__v > 0);

      dispatch(addBunToConstructorAction(ingredient));

      if (!previousBun) return;

      dispatch(decreaseIngredientAmountAction(previousBun._id));
    } else {
      dispatch(addFillingToConstructorAction({
        ...ingredient,
        key: `${ingredient._id}${ingredient.__v}`
      }))
    }
  }

  return (
    <div className={styles.container}>
      <BurgerConstructor onDropHandler={handleDrop}/>

      <div className={`${styles.bottom} mt-5 pr-4`}>
        <p className={`${styles.total} mr-10`}>
          <span className="text text_type_digits-medium">{orderSum}</span>
          <CurrencyIcon type={"primary"} />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onOrderClick}
          disabled={constructorIngredients.bun === null || !constructorIngredients.filling.length}
        >
          Оформить заказ
        </Button>
      </div>

      {orderInfo.number && (
        <Modal onClose={closeOrderModal}>
          <OrderConfirmModal />
        </Modal>
      )}
    </div>
  )
}

export default Cart;