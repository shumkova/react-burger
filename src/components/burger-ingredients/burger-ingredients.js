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

  const buns = ingredients.filter((item) => item.type === 'bun');
  const main = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const scrollable = React.createRef();

  const listenSectionsScroll = () => {
    const sections = document.querySelectorAll('[data-ingredient-type]');

    scrollable.current.addEventListener('scroll', (evt) => {
      const scrollableTop = evt.target.offsetTop + evt.target.scrollTop;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (sectionTop <= scrollableTop && (sectionTop + section.offsetHeight) > scrollableTop) {
          setCurrentTab(section.dataset.ingredientType);
        }
      })
    })
  }

  React.useEffect(listenSectionsScroll, []);

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

  const onTabClick = (tabName) => {
    const section = document.querySelector(`[data-ingredient-type = ${tabName}]`);
    section.scrollIntoView(({behavior: 'smooth'}));
    if (checkTab(tabName)) {
      setCurrentTab(tabName);
    }
  }

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

      <div className={styles.sections} id="ingredients" ref={scrollable} onClick={onIngredientsCLick}>
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
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default BurgerIngredients;