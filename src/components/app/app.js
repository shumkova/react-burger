import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ErrorBoundary from '../error-boundary/error-doundary';
import ErrorMessage from '../error-message/error-message';
import { Loader } from '../../ui/loader/loader';
import Cart from '../cart/cart';
import { getIngredients } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector( state => state.app);

  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  return (
    <ErrorBoundary>
      <div className="page">
        <AppHeader activeLink={'main'}/>

        <main className="main container pt-10">

          {ingredientsFailed && <ErrorMessage /> }

          {ingredientsRequest ? (
            <Loader size="large"/>
          ) :
            ingredients.length > 0 &&
            (
              <>
                <h1 className="main__title text text_type_main-large mb-5">Соберите бургер</h1>
                <div className="two-columns">
                  <BurgerIngredients />
                  <Cart />
                </div>
              </>
            )
          }

        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App;