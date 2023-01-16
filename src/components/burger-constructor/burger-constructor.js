import React, { memo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorIngredientsPropTypes } from '../../utils/proptypes';
import {useDispatch, useSelector} from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {DECREASE_INGREDIENT_AMOUNT, REMOVE_FILLING_FROM_CONSTRUCTOR} from "../../services/actions";

const BurgerConstructor = memo((props) => {
  const { onDropHandler } = props;
  const { bun, filling } = useSelector(state => state.cart.constructorIngredients);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(itemId) {
      onDropHandler(itemId);
    }
  });

  let innerElements = null;

  const removeIngredient = (id, index) => {
    dispatch({
      type: REMOVE_FILLING_FROM_CONSTRUCTOR,
      index
    })

    dispatch({
      type: DECREASE_INGREDIENT_AMOUNT,
      id
    })
  }

  if (filling.length > 0) {
    innerElements = filling.map((item, index) => {
      const duplicates = filling.filter((filterItem) => filterItem['_id'] === item['_id']);

      return (
        <li className={styles.item} key={duplicates.length > 1 ? `${item['_id']}-${index}` : item['_id'] }>
          <button className={styles.drug} type="button"><DragIcon type="primary" /></button>
          <ConstructorElement text={item.name} thumbnail={item.image} price={item.price} handleClose={() => removeIngredient(item['_id'], index)}/>
        </li>
      );
    })
  }

  const chosen = bun || innerElements;

  return (

    <div className={`pl-4 pb-5 ${styles.container} ${!chosen ? styles.container_empty : ''}`} ref={dropTarget}>
      {!chosen && <p className="text text_type_main-medium">Перетащите выбранные ингредиенты сюда</p>}
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
