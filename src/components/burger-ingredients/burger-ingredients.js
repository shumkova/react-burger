import React, { useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import {CLEAR_INGREDIENT_DETAILS, TAB_SWITCH} from '../../services/actions/menu';
import Tabs from "../tabs/tabs";
import Ingredients from "../ingredients/ingredients";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredientDetails } = useSelector( (state) => state.menu);

  const setCurrentTab = useCallback((tab) => {
    dispatch({
      type: TAB_SWITCH,
      tab,
    })
  }, [dispatch]);

  const onModalClose = () => {
    dispatch({
      type: CLEAR_INGREDIENT_DETAILS,
    })
  }

  return (
    <div className={styles.container}>
      <Tabs setCurrentTab={setCurrentTab}/>
      <Ingredients setCurrentTab={setCurrentTab}/>
      {ingredientDetails &&
        <Modal onClose={onModalClose} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      }
    </div>
  )
}

export default BurgerIngredients;