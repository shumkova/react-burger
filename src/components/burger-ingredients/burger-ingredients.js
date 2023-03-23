import React, { useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { useDispatch } from 'react-redux';
import { tabSwitchAction } from '../../services/actions/menu';
import Tabs from '../tabs/tabs';
import Ingredients from '../ingredients/ingredients';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const setCurrentTab = useCallback((tab) => {
    dispatch(tabSwitchAction(tab));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Tabs setCurrentTab={setCurrentTab}/>
      <Ingredients setCurrentTab={setCurrentTab}/>
    </div>
  )
}

export default BurgerIngredients;