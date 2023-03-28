import React, {SyntheticEvent, useMemo} from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import styles from './cart.module.css';
import { clearOrderInfoAction, placeOrder } from '../../services/actions/order';
import { decreaseIngredientAmountAction, increaseIngredientAmountAction } from '../../services/actions/ingredients';
import { addBunToConstructorAction, addFillingToConstructorAction } from '../../services/actions/burger-constructor';
import { countSum } from './cart.utils';
import { BUN } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import OrderConfirmModal from '../order-confirm-modal/order-confirm-modal';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TAnyFunc } from '../../services/types/utils';

const Cart = () => {
  const constructorIngredients = useAppSelector(state => state.constructorIngredients);
  const { user } = useAppSelector(state => state.auth);
  const { orderInfo } = useAppSelector(state => state.order);
  const { ingredients } = useAppSelector(state => state.ingredients);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeOrderModal: TAnyFunc = () => {
    dispatch(clearOrderInfoAction());
  }

  const orderSum = useMemo(() => {
    return countSum(constructorIngredients);
  }, [constructorIngredients])

  const onOrderClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (!constructorIngredients.bun) return;
    const ids = [constructorIngredients.bun._id, ...constructorIngredients.filling.map((item) => item._id), constructorIngredients.bun._id];
    user ? dispatch(placeOrder(ids)) : navigate('/login');
  }

  const handleDrop = (draggableItem: { id: string; originalIndex: string }) => {
    const ingredient = ingredients.find((item) => item._id === draggableItem.id);
    if (!ingredient) return;
    dispatch(increaseIngredientAmountAction(draggableItem.id));

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

      {orderInfo?.number && (
        <Modal onClose={closeOrderModal}>
          <OrderConfirmModal />
        </Modal>
      )}
    </div>
  )
}

export default Cart;