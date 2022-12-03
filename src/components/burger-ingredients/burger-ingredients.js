import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/proptypes";
import IngredientTypes from "../ingredient-types/ingredient-types";

class BurgerIngredients extends React.Component {
  render () {
    const {current, onCLick, ingredients} = this.props;

    const buns = ingredients.filter((item) => item.type === 'bun');
    const main = ingredients.filter((item) => item.type === 'main');
    const sauces = ingredients.filter((item) => item.type === 'sauce');

    return (
      <div className={styles.ingredients}>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value="bun" active={current === 'bun'} onClick={onCLick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onCLick}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onCLick}>
            Начинки
          </Tab>
        </div>
        <div className={styles.sections}>
          <IngredientTypes title="Булки" sectionList={buns}/>
          <IngredientTypes title="Соусы" sectionList={sauces}/>
          <IngredientTypes title="Начинки" sectionList={main}/>
        </div>
      </div>
    )
  }
}

BurgerIngredients.propTypes = {
  current: PropTypes.string,
  onClick: PropTypes.func,
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;