import React, { useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { tabSwitchAction } from '../../services/actions/menu';
import Tabs from '../tabs/tabs';
import Ingredients from '../ingredients/ingredients';
import { useAppDispatch } from '../../services/hooks';

export type TSetCurrentTab = (arg: string ) => void;

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();

  const setCurrentTab: TSetCurrentTab = useCallback((tab) => {
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