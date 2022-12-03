import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/proptypes";
import IngredientTypes from "../ingredient-types/ingredient-types";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun',
    }
    this.scrollable = React.createRef();
  }

  setCurrentTab = (tabName) => {
    this.setState((prevState) => ({
      ...prevState,
      current: tabName,
    }))
  }

  checkTab = (tabName) => {
    return this.state.current !== tabName;
  }

  onSectionScroll = () => {
    const parentTop = this.scrollable.current.offsetTop + this.scrollable.current.scrollTop;
    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 20;
      if (sectionTop <= parentTop && (sectionTop + section.offsetHeight) > parentTop) {
        if (this.checkTab(section.dataset.section)) {
          this.setCurrentTab(section.dataset.section);
        }
      }
    })
  }

  onTabClick = (tabName) => {
    const section = document.querySelector(`[data-section = ${tabName}]`);
    section.scrollIntoView(({behavior: 'smooth'}));
    if (this.checkTab(tabName)) {
      this.setCurrentTab(tabName);
    }
  }

  render () {
    const {ingredients} = this.props;

    const buns = ingredients.filter((item) => item.type === 'bun');
    const main = ingredients.filter((item) => item.type === 'main');
    const sauces = ingredients.filter((item) => item.type === 'sauce');

    return (
      <div className={styles.ingredients}>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value="bun" active={this.state.current === 'bun'} onClick={this.onTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.onTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={this.state.current === 'main'} onClick={this.onTabClick}>
            Начинки
          </Tab>
        </div>
        <div className={styles.sections} id="ingredients" ref={this.scrollable} onScroll={this.onSectionScroll}>
          <IngredientTypes type="bun" title="Булки" sectionList={buns}/>
          <IngredientTypes type="sauce" title="Соусы" sectionList={sauces}/>
          <IngredientTypes type="main" title="Начинки" sectionList={main}/>
        </div>
      </div>
    )
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;