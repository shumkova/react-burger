import React, { memo, FC } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { moveFillingIngredientsAction } from '../../services/actions/burger-constructor';
import FillingIngredient from '../filling-ingredient/filling-ingredient';
import { BUN, MAIN, SAUCE } from '../../utils/consts';
import { TConstructorIngredient } from '../../services/types/data';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

interface IBurgerConstructor {
  onDropHandler: (arg: { id: string; originalIndex: string }) => void;
}

export type TFindIngredient = (arg: string) => {ingredient: TConstructorIngredient, index: number};
export type TMoveFillingIngredient = (key: string, toIndex: number) => void;

const BurgerConstructor: FC<IBurgerConstructor> = memo(({ onDropHandler }) => {
  const { bun, filling } = useAppSelector(state => state.constructorIngredients);
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: [BUN, SAUCE, MAIN],
    drop(itemId: { id: string; originalIndex: string }) {
      onDropHandler(itemId);
    }
  });

  const findFillingIngredient: TFindIngredient = (key) => {
    const ingredient = filling.filter((item: TConstructorIngredient) => `${item.key}` === key)[0];
    return {
      ingredient,
      index: filling.indexOf(ingredient),
    }
  }

  const moveFillingIngredient: TMoveFillingIngredient = (key, toIndex) => {
    const { index } = findFillingIngredient(key);
    dispatch(moveFillingIngredientsAction(index, toIndex));
  }

  const chosen = bun || filling.length > 0;

  return (
    <div className={`pl-4 pb-5 ${styles.container} ${!chosen ? styles.container_empty : ''}`} ref={dropTarget}>
      {!chosen && <p className="text text_type_main-default">Перетащите выбранные ингредиенты сюда</p>}
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + ' (верх)'}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-8 mb-4 ${styles.element}`}
        />
      )}

      <ul className={`${styles.inner}`}>
        {
          filling.length > 0 ?
            filling.map((item: TConstructorIngredient) => (
              <FillingIngredient data={item} moveIngredient={moveFillingIngredient} findIngredient={findFillingIngredient} key={item.key}/>
            ))
            : ('')
        }
      </ul>

      {bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + ' (низ)'}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-8 mt-4 ${styles.element}`}
        />
      )}
    </div>
  )
})

export default BurgerConstructor;
