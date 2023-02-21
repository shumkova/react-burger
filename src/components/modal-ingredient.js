import React from 'react';
import Modal from './modal/modal';
import { useSelector } from 'react-redux';
import IngredientDetails from './ingredient-details/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';

const ModalIngredient = () => {
  const { ingredients } = useSelector( (state) => state.ingredients);
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredient = ingredients.find(item => item._id === id);

  const onModalClose = () => {
    navigate(-1);
  }

  if (!ingredient) {
    return null;
  }

  return (
    <Modal onClose={onModalClose} title="Детали ингредиента">
      <IngredientDetails ingredient={ingredient}/>
    </Modal>
  )
}

export default ModalIngredient;