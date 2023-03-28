import IngredientTypes from '../ingredient-types/ingredient-types';
import React, { memo, createRef, useMemo, useEffect } from 'react';
import styles from './ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../utils/consts';
import { useAppSelector } from '../../services/hooks';
import { TSetCurrentTab } from '../burger-ingredients/burger-ingredients';

interface IIngredients {
  setCurrentTab: TSetCurrentTab;
}

const Ingredients = memo<IIngredients>(({ setCurrentTab }) => {
  const { ingredients } = useAppSelector( (state) => state.ingredients);
  const sectionRef = createRef<HTMLDivElement>();

  const buns = useMemo(() => ingredients.filter((item) => item.type === BUN), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === MAIN), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === SAUCE), [ingredients]);

  useEffect(() => {
    const scrollableEl = sectionRef.current;

    const listenSectionScroll = (evt: Event) => {
      if (!scrollableEl) return;
      const sectionContainerTop = scrollableEl.offsetTop + scrollableEl.scrollTop;
      const types: NodeListOf<HTMLDivElement> = scrollableEl.querySelectorAll('[data-ingredient-type]');

      types.forEach((el, index) => {
        if (el) {
          const sectionTop = el.offsetTop;
          const sectionBottom = sectionTop + el.offsetHeight;

          if (sectionTop <= sectionContainerTop && sectionBottom > sectionContainerTop) {
            setCurrentTab(el.dataset.ingredientType as string);
          }
        }
      })
    }

    if (!scrollableEl) return;

    scrollableEl.addEventListener('scroll', listenSectionScroll)

    return () => {
      scrollableEl.removeEventListener('scroll', listenSectionScroll)
    }
  }, [ingredients, sectionRef, setCurrentTab]);

  return (
    <div className={`${styles.container} scroll`} id="ingredients" ref={sectionRef}>
      <IngredientTypes type={BUN} title="Булки" sectionList={buns} />
      <IngredientTypes type={SAUCE} title="Соусы" sectionList={sauces} />
      <IngredientTypes type={MAIN} title="Начинки" sectionList={main} />
    </div>
  )
})

export default Ingredients;