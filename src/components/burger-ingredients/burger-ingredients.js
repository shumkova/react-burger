import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes} from '../../utils/proptypes';
import IngredientTypes from '../ingredient-types/ingredient-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = (props) => {
  const {ingredients} = props;

  const [currentTab, setCurrentTab] = React.useState('bun');
  const [ingredientDetails, setIngredientDetails] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  const scrollable = React.createRef();

  const onIngredientsCLick = (e) => {
    const ingredientEl = e.target.closest('[data-ingredient]');

    if (ingredientEl) {
      setIngredientDetails(ingredients.find((item) => item['_id'] === ingredientEl.dataset.ingredient));
      setModal(true);
    }
  }

  const onModalClose = () => {
    setModal(false);
    setIngredientDetails(null);
  }

  const checkTab = (tabName) => {
    return currentTab !== tabName;
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

  const buns = ingredients.filter((item) => item.type === 'bun');
  const main = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return (
    <div className={styles.ingredients}>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>

      <div className={styles.sections} id="ingredients" ref={scrollable} onScroll={onSectionScroll} onClick={onIngredientsCLick}>
        <IngredientTypes type="bun" title="Булки" sectionList={buns}/>
        <IngredientTypes type="sauce" title="Соусы" sectionList={sauces}/>
        <IngredientTypes type="main" title="Начинки" sectionList={main}/>
      </div>

      {modal && ingredientDetails &&
        <Modal onClose={onModalClose} title="Детали ингредиента">
          <IngredientDetails data={ingredientDetails}/>
        </Modal>
      }
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  onIngredientClick: PropTypes.func
}

export default BurgerIngredients;