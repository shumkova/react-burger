import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Cart from '../components/cart/cart';

const MainPage = () => {
  return (
    <main className="main container pt-10">
      <h1 className="main__title text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="two-columns">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <Cart />
        </DndProvider>
      </div>
    </main>
  )
}

export default MainPage;