import React from 'react';
import styles from './ingredient.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IngredientPage = () => {
  const { ingredients } = useSelector(state => state.ingredients);
  const { id } = useParams();
  const ingredient = ingredients.find(item => item._id === id);

  if (!ingredient) {
    return <Navigate to={'/404'} replace/>
  }

  return (
    <main className={`${styles.container}`}>
      <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient}/>
    </main>
  )
}

export default IngredientPage;