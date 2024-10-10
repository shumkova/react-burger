import React, {FC, useRef} from 'react';
import styles from './filling-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { decreaseIngredientAmountAction } from '../../services/actions/ingredients';
import { removeFillingFromConstructorAction } from '../../services/actions/burger-constructor';
import {DropTargetMonitor, useDrag, useDrop} from 'react-dnd';
import { TConstructorIngredient } from '../../services/types/data';
import { TFindIngredient, TMoveFillingIngredient } from '../burger-constructor/burger-constructor';
import { useAppDispatch } from '../../services/hooks';

interface IFillingIngredient {
  data: TConstructorIngredient;
  moveIngredient: TMoveFillingIngredient;
  findIngredient: TFindIngredient;
}

type TDragObject = {
  id: string;
  originalIndex: number;
}

const FillingIngredient: FC<IFillingIngredient> = ({ data, moveIngredient, findIngredient }) => {
  const id = data._id;
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const originalIndex = findIngredient(data.key).index;

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'filling',
      item: {
        id: data.key,
        originalIndex
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const {id: droppedKey, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedKey, originalIndex);
        }
      }
    }), [moveIngredient, findIngredient]
  );

  const [{ handlerId }, dropRef] = useDrop({
    accept: ['filling'],
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item: TDragObject) => {
      const draggedKey = item.id;
      if (draggedKey !== data.key ) {
        const { index: overIndex } = findIngredient(data.key);
        moveIngredient(draggedKey, overIndex);
      }
    }
  })

  dragRef(dropRef(ref));

  const removeIngredient = (id: string, key: string): void => {
    dispatch(removeFillingFromConstructorAction(key));
    dispatch(decreaseIngredientAmountAction(id));
  };

  const opacity = isDragging ? 0 : 1;

  return (
    <li className={styles.item} ref={ref} data-handler-id={handlerId} style={{opacity}}>
      <span className={styles.drug}><DragIcon type="primary" /></span>
      <ConstructorElement text={data.name} thumbnail={data.image} price={data.price} handleClose={() => removeIngredient(id, data.key)}/>
    </li>
  );
}

export default FillingIngredient;