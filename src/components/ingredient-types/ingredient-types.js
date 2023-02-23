import React from 'react';
import styles from './ingredient-types.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/proptypes';

const IngredientTypes = ({ type, title, sectionList }) => {
  return (
    <section className={styles.type} data-ingredient-type={type}>
      <h2 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <ul className={`${styles.list} pl-4 pr-2`}>
        {sectionList.map((item, index) => {
          return (
            <li className={styles.item} key={item['_id']} tabIndex={0}>
              <IngredientCard data={item}/>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

IngredientTypes.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sectionList: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default IngredientTypes;