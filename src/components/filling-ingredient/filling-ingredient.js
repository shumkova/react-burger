import React, {useRef} from 'react';
import styles from './filling-ingredient.module.css';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { DECREASE_INGREDIENT_AMOUNT } from '../../services/actions/ingredients';
import { removeFillingFromConstructorAction } from '../../services/actions/burger-constructor';
import {useDispatch} from 'react-redux';
import {ingredientPropTypes} from '../../utils/proptypes';
import {useDrag, useDrop} from 'react-dnd';

const FillingIngredient = ({ data, moveIngredient, findIngredient }) => {
  const id = data._id;
  const dispatch = useDispatch();
  const ref = useRef();

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
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: ({id: draggedKey}) => {
      if (draggedKey !== data.key ) {
        const { index: overIndex } = findIngredient(data.key);
        moveIngredient(draggedKey, overIndex);
      }
    }
  })

  dragRef(dropRef(ref));

  const removeIngredient = (id, key) => {
    dispatch(removeFillingFromConstructorAction(key));

    dispatch({
      type: DECREASE_INGREDIENT_AMOUNT,
      id
    })
  };

  const opacity = isDragging ? 0 : 1;

  return (
    <li className={styles.item} ref={ref} data-handler-id={handlerId} style={{opacity}}>
      <span className={styles.drug}><DragIcon type="primary" /></span>
      <ConstructorElement text={data.name} thumbnail={data.image} price={data.price} handleClose={() => removeIngredient(id, data.key)}/>
    </li>
  );
}

FillingIngredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
}

export default FillingIngredient;