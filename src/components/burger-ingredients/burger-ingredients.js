import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/proptypes';
import IngredientTypes from '../ingredient-types/ingredient-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DETAILS_MODAL, CLOSE_DETAILS_MODAL, TAB_SWITCH } from '../../services/actions';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector( (state) => state.app);
  const { currentTab, modal } = useSelector( (state) => state.burgerIngredients);

  const setCurrentTab = (tab) => {
    dispatch({
      type: TAB_SWITCH,
      tab: tab,
    })
  }

  const buns = ingredients.filter((item) => item.type === 'bun');
  const main = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const scrollable = React.createRef();

  const listenSectionsScroll = () => {
    const sections = document.querySelectorAll('[data-ingredient-type]');

    if (!scrollable.current) {return}

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

  useEffect(listenSectionsScroll, []);

  const onIngredientCLick = (e) => {
    const ingredientEl = e.target.closest('[data-ingredient]');
    if (ingredientEl) {
      dispatch({
        type: OPEN_DETAILS_MODAL,
        ingredient: ingredients.find((item) => item['_id'] === ingredientEl.dataset.ingredient)
      })
    }
  }

  const onModalClose = () => {
    dispatch({
      type: CLOSE_DETAILS_MODAL,
    })
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

  const tabs = useMemo(() => (
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
  ), [currentTab]);

  const content = useMemo(() => (
    <div className={styles.sections} id="ingredients" ref={scrollable} onClick={onIngredientCLick}>
      <IngredientTypes type="bun" title="Булки" sectionList={buns}/>
      <IngredientTypes type="sauce" title="Соусы" sectionList={sauces}/>
      <IngredientTypes type="main" title="Начинки" sectionList={main}/>
    </div>
  ), [ingredients])

  return (
    <div className={styles.ingredients}>
      {tabs}
      {content}

      {modal &&
        <Modal onClose={onModalClose} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      }
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerIngredients;