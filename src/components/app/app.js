import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {getIngredients} from '../../services/burger-api';
import ErrorBoundary from '../error-boundary/error-doundary';
import ErrorMessage from '../error-message/error-message';
import {ConstructorContext} from '../../services/ingredientsContext';
import {Loader} from '../../ui/loader/loader';
import Cart from '../cart/cart';
import {ApiErrorContext} from '../../services/apiErrorContext';

const App = () => {
  const [ingredients, setIngredients] = useState([])

  const [ constructorIngredients, setConstructorIngredients ] = useState({
    bun: null,
    filling: []
  });

  const [ apiError, setApiError ] = useState();
  const [ ingredientsRequest, setIngredientsRequest ] = useState(false);
  const [ ingredientsFailed, setIngredientsFailed ] = useState(false);

  useEffect(() => {
    setIngredientsRequest(true);
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          setIngredients(res.data)
          setConstructorIngredients({
            bun: res.data.find((item) => item.type === 'bun'),
            filling: res.data.filter((item) => item.type !== 'bun').slice(0, Math.floor(Math.random()*res.data.length)),
          });
          setIngredientsRequest(false);
          setIngredientsFailed(false);
        } else {
          setIngredientsRequest(false);
          setIngredientsFailed(true);
        }
      })
      .catch((err) => {
        setApiError(err.message);
        setIngredientsRequest(false);
        setIngredientsFailed(true);
      })
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
                  <BurgerIngredients ingredients={ingredients}/>
                  <ConstructorContext.Provider value={{ constructorIngredients, setConstructorIngredients }}>
                    <ApiErrorContext.Provider value={{ apiError, setApiError }}>
                      <Cart />
                    </ApiErrorContext.Provider>
                  </ConstructorContext.Provider>
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