import React, { memo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { MOVE_FILLING_INGREDIENTS } from '../../services/actions/burger-constructor';
import FillingIngredient from '../filling-ingredient/filling-ingredient';
import { BUN, MAIN, SAUCE } from '../../utils/consts';

const BurgerConstructor = memo(({ onDropHandler }) => {
  const { bun, filling } = useSelector(state => state.constructorIngredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: [BUN, SAUCE, MAIN],
    drop(itemId) {
      onDropHandler(itemId);
    }
  });

  const findFillingIngredient = (key) => {
    const ingredient = filling.filter((item) => `${item.key}` === key)[0];
    return {
      ingredient,
      index: filling.indexOf(ingredient),
    }
  }

  const moveFillingIngredient = (key, toIndex) => {
    const { index } = findFillingIngredient(key);
    dispatch({
      type: MOVE_FILLING_INGREDIENTS,
      index,
      toIndex
    })
  }

  const chosen = bun || filling.length > 0;

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

      <ul className={`${styles.inner}`}>
        {
          filling.length > 0 ?
            filling.map((item, index) => (
              <FillingIngredient data={item} index={index} moveIngredient={moveFillingIngredient} findIngredient={findFillingIngredient} key={item.key}/>
            ))
            : ('')
        }
      </ul>

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
  onDropHandler: PropTypes.func.isRequired
}

export default BurgerConstructor;
