import React, { useMemo, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientTypes from '../ingredient-types/ingredient-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DETAILS_MODAL, CLOSE_DETAILS_MODAL, TAB_SWITCH } from '../../services/actions/menu';
import Tabs from "../tabs/tabs";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector( (state) => state.app);
  const { currentTab, modal } = useSelector( (state) => state.menu);

  const setCurrentTab = (tab) => {
    dispatch({
      type: TAB_SWITCH,
      tab,
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

  const onTabClick = (tabName) => {
    const section = document.querySelector(`[data-ingredient-type = ${tabName}]`);
    section.scrollIntoView(({behavior: 'smooth'}));
    if (currentTab !== tabName) {
      setCurrentTab(tabName);
    }
  }

  const content = useMemo(() => (
    <div className={styles.sections} id="ingredients" ref={scrollable} onClick={onIngredientCLick}>
      <IngredientTypes type="bun" title="Булки" sectionList={buns}/>
      <IngredientTypes type="sauce" title="Соусы" sectionList={sauces}/>
      <IngredientTypes type="main" title="Начинки" sectionList={main}/>
    </div>
  ), [ingredients])

  return (
    <div className={styles.container}>
      <Tabs onTabClick={onTabClick} currentTab={currentTab}/>
      {content}

      {modal &&
        <Modal onClose={onModalClose} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      }
    </div>
  )
}

export default BurgerIngredients;