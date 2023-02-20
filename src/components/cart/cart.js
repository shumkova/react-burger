import React, { useMemo } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ORDER_INFO, placeOrder} from '../../services/actions/order';
import { DECREASE_INGREDIENT_AMOUNT, INCREASE_INGREDIENT_AMOUNT } from '../../services/actions/ingredients';
import { ADD_BUN_TO_CONSTRUCTOR, ADD_FILLING_TO_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import { countSum } from './cart.utils';
import OrderModal from '../order-modal/order-modal';
import { BUN } from '../../utils/consts';
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const constructorIngredients = useSelector(state => state.constructorIngredients);
  const { user } = useSelector(state => state.auth);
  const { orderInfo } = useSelector(state => state.order);
  const { ingredients } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeOrderModal = () => {
    dispatch({
      type: CLEAR_ORDER_INFO
    })
  }

  const orderSum = useMemo(() => {
    return countSum(constructorIngredients);
  }, [constructorIngredients])

  const onOrderClick = (evt) => {
    evt.preventDefault();
    const ids = [constructorIngredients.bun['_id'], ...constructorIngredients.filling.map((item) => item['_id']), constructorIngredients.bun['_id']];
    user ? dispatch(placeOrder(ids)) : navigate('/login');
  }

  const handleDrop = (draggableItem) => {
    dispatch({
      type: INCREASE_INGREDIENT_AMOUNT,
      id: draggableItem.id
    });

    const ingredient = ingredients.find((item) => item['_id'] === draggableItem.id);

    if (ingredient.type === BUN) {
      const previousBun = ingredients.find((item) => item.type === BUN && item['__v'] > 0);

      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        bun: ingredient
      })

      if (!previousBun) return;

      dispatch({
        type: DECREASE_INGREDIENT_AMOUNT,
        id: previousBun['_id']
      });
    } else {
      dispatch({
        type: ADD_FILLING_TO_CONSTRUCTOR,
        ingredient: {
          ...ingredient,
          key: `${ingredient['_id']}${ingredient['__v']}`
        }
      })
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
          <OrderModal />
        </Modal>
      )}
    </div>
  )
}

export default Cart;