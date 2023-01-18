import React, {memo, useCallback} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorIngredientsPropTypes } from '../../utils/proptypes';
import {useDispatch, useSelector} from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { UPDATE_FILLING_INGREDIENTS } from '../../services/actions/burger-constructor';
import FillingIngredient from '../filling-ingredient/filling-ingredient';

const BurgerConstructor = memo((props) => {
  const { onDropHandler } = props;
  const { bun, filling } = useSelector(state => state.constructorIngredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(itemId) {
      onDropHandler(itemId);
    }
  });

  const findFillingIngredient = useCallback(
    (key) => {
      const ingredient = filling.filter((item) => `${item.key}` === key)[0];
      return {
        ingredient,
        index: filling.indexOf(ingredient),
      }
    },
    [filling]
  )

  const moveFillingIngredient = (key, toIndex) => {
    const { ingredient, index } = findFillingIngredient(key);
    filling.splice(toIndex, 0, filling.splice(index, 1)[0]);
    dispatch({
      type: UPDATE_FILLING_INGREDIENTS,
      ingredients: filling
    })
  }

  let innerElements = null;

  if (filling.length > 0) {
    innerElements = filling.map((item, index) => {
      return (
        <FillingIngredient data={item} index={index} moveIngredient={moveFillingIngredient} findIngredient={findFillingIngredient} key={item.key}/>
      );
    })
  }

  const chosen = bun || innerElements;

  return (

    <div className={`pl-4 pb-5 ${styles.container} ${!chosen ? styles.container_empty : ''}`} ref={dropTarget}>
      {!chosen && <p className="text text_type_main-default">Перетащите выбранные ингредиенты сюда</p>}
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-8 mb-4 ${styles.element}`}
        />
      )}

      {innerElements && (
        <ul className={`${styles.inner}`}>
          {innerElements}
        </ul>
      )}

      {bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-8 mt-4 ${styles.element}`}
        />
      )}
    </div>
  )
})

BurgerConstructor.propTypes = {
  constructorIngredients: constructorIngredientsPropTypes,
  onDropHandler: PropTypes.func.isRequired
}

export default BurgerConstructor;
