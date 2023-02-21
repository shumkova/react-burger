import IngredientTypes from '../ingredient-types/ingredient-types';
import React, { memo, createRef, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../utils/consts';
import {useLocation, useNavigate} from "react-router-dom";

const Ingredients = memo(({ setCurrentTab }) => {
  const { ingredients } = useSelector( (state) => state.ingredients);
  const sectionRef = createRef();
  const navigate = useNavigate();
  const location = useLocation();

  const buns = useMemo(() => ingredients.filter((item) => item.type === BUN), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === MAIN), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === SAUCE), [ingredients]);

  const onIngredientCLick = (e) => {
    const ingredientEl = e.target.closest('[data-ingredient]');
    const id = ingredientEl.dataset.ingredient;

    if (ingredientEl) {
      navigate(`/ingredients/${id}`, {state: {...location.state, backgroundLocation: location}});
    }
  }

  useEffect(() => {
    const scrollableEl = sectionRef.current;

    const listenSectionScroll = (evt) => {
      const sectionContainerTop = scrollableEl.offsetTop + scrollableEl.scrollTop;
      const types = scrollableEl.querySelectorAll('[data-ingredient-type]');

      types.forEach((el, index) => {
        if (el) {
          const sectionTop = el.offsetTop;
          const sectionBottom = sectionTop + el.offsetHeight;

          if (sectionTop <= sectionContainerTop && sectionBottom > sectionContainerTop) {
            setCurrentTab(el.dataset.ingredientType);
          }
        }
      })
    }

    scrollableEl.addEventListener('scroll', listenSectionScroll)

    return () => {
      scrollableEl.removeEventListener('scroll', listenSectionScroll)
    }
  }, [ingredients, sectionRef, setCurrentTab]);

  return (
    <div className={styles.container} id="ingredients" onClick={onIngredientCLick} ref={sectionRef}>
      <IngredientTypes type={BUN} title="Булки" sectionList={buns} />
      <IngredientTypes type={SAUCE} title="Соусы" sectionList={sauces} />
      <IngredientTypes type={MAIN} title="Начинки" sectionList={main} />
    </div>
  )
})

Ingredients.propTypes = {
  setCurrentTab: PropTypes.func.isRequired
}

export default Ingredients;