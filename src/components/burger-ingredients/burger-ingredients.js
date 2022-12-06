import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes} from '../../utils/proptypes';
import IngredientTypes from '../ingredient-types/ingredient-types';

const BurgerIngredients = (props) => {
  const [state, setState] = React.useState({
    current: 'bun'
  })

  const scrollable = React.createRef();

  const setCurrentTab = (tabName) => {
    setState({
      ...state,
      current: tabName,
    })
  }

  const checkTab = (tabName) => {
    return state.current !== tabName;
  }

  const onSectionScroll = () => {
    const parentTop = scrollable.current.offsetTop + scrollable.current.scrollTop;
    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 20;
      if (sectionTop <= parentTop && (sectionTop + section.offsetHeight) > parentTop) {
        if (checkTab(section.dataset.section)) {
          setCurrentTab(section.dataset.section);
        }
      }
    })
  }

  const onTabClick = (tabName) => {
    const section = document.querySelector(`[data-section = ${tabName}]`);
    section.scrollIntoView(({behavior: 'smooth'}));
    if (checkTab(tabName)) {
      setCurrentTab(tabName);
    }
  }

  const {ingredients} = props;

  const buns = ingredients.filter((item) => item.type === 'bun');
  const main = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return (
    <div className={styles.ingredients}>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="bun" active={state.current === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={state.current === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={state.current === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.sections} id="ingredients" ref={scrollable} onScroll={onSectionScroll}>
        <IngredientTypes type="bun" title="Булки" sectionList={buns}/>
        <IngredientTypes type="sauce" title="Соусы" sectionList={sauces}/>
        <IngredientTypes type="main" title="Начинки" sectionList={main}/>
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;