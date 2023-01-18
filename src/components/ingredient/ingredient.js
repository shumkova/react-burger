import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/proptypes';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
  const {data} = props;
  const id = data['_id'];

  const chosenBun = data.type === 'bun' && data['__v'] > 0;

  const [, dragRef] = useDrag({
    type: data.type,
    item: {id}
  });

  return (
    (
      <div
        className={`${styles.container} ${chosenBun && styles.disabled}`}
        data-ingredient={id}
        {...(!chosenBun && { ref: dragRef })}
      >
        <div className={styles.info}>
          <div className={styles.wrapper}>
            <picture>
              <source media="(max-width: 767px)" srcSet={data['image_mobile']}/>
              <img className={styles.img} src={data.image} alt={data.name}/>
            </picture>
          </div>
          <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
            {data.price}
            <CurrencyIcon type="primary" />
          </p>
          <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
        </div>
        {
          data['__v'] > 0 && <Counter count={data['__v']} size="default" extraClass="m-1" />
        }
      </div>
    )
  )
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default Ingredient;