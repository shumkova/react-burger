import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes} from '../../utils/proptypes';
import {ConstructorContext} from '../../services/ingredientsContext';

const BurgerConstructor = () => {
  const { constructorIngredients } = useContext(ConstructorContext);
  const { bun, filling } = constructorIngredients;

  let innerElements = null;

  if (filling.length > 0) {
    innerElements = filling.map((item) => {
      return (
        <li className={styles.item} key={item['_id']}>
          <button className={styles.drug} type="button"><DragIcon type="primary" /></button>
          <ConstructorElement text={item.name} thumbnail={item.image} price={item.price} />
        </li>
      );
    })
  }

  return (
    <div className="pl-4 pb-5">
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={'ml-8 mb-4'}
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
          extraClass={'ml-8 mt-4'}
        />
      )}
    </div>
  )
}

BurgerConstructor.propTypes = {
  constructorIngredients: PropTypes.object,
  bun: ingredientPropTypes,
  filling: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerConstructor;
