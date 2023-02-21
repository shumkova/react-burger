import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/proptypes';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.wrapper}>
        <picture>
          <source media="(max-width: 767px)" srcSet={ingredient.image}/>
          <img className={styles.img} src={ingredient['image_large']} alt={ingredient.name}/>
        </picture>
      </div>
      <h3 className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h3>
      <ul className={styles.nutrition}>
        <li className={styles.nutrition__item}>
          <span className={'text text_type_main-default text_color_inactive mb-2'}>Калории, ккал</span>
          <span className={'text text_type_digits-default text_color_inactive'}>{ingredient.calories}</span>
        </li>
        <li className={styles.nutrition__item}>
          <span className={'text text_type_main-default text_color_inactive mb-2'}>Белки, г</span>
          <span className={'text text_type_digits-default text_color_inactive'}>{ingredient.proteins}</span>
        </li>
        <li className={styles.nutrition__item}>
          <span className={'text text_type_main-default text_color_inactive mb-2'}>Жиры, г</span>
          <span className={'text text_type_digits-default text_color_inactive'}>{ingredient.fat}</span>
        </li>
        <li className={styles.nutrition__item}>
          <span className={'text text_type_main-default text_color_inactive mb-2'}>Углеводы, г</span>
          <span className={'text text_type_digits-default text_color_inactive'}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = ingredientPropTypes;

export default IngredientDetails;