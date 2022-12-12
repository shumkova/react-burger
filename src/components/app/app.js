import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {getIngredients} from '../../utils/burger-api';
import ErrorBoundary from '../error-boundary/error-doundary';
import ErrorMessage from '../error-message/error-message';

const App = () => {
  const [state, setState] = React.useState({
    ingredients: [],
    chosen: {},
  })

  const [apiError, setApiError] = React.useState(null);

  const [orderModal, setOrderModal] = React.useState(false);

  const showOrderModal = (evt) => {
    evt.preventDefault();
    setOrderModal(true);
  }

  const closeOrderModal = () => {
    setOrderModal(false);
  }

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        setApiError(null);
        setState({
          ...state,
          ingredients: res.data,
          chosen: {
            bun: res.data.find((item) => item.type === 'bun'),
            inner: res.data.filter((item) => item.type !== 'bun').slice(0, 3),
          },
        })
      })
      .catch((err) => {
        setApiError(err.message);
      })
  }, [])

  return (
    <ErrorBoundary>
      <div className="page">
        <AppHeader activeLink={'main'}/>
        <main className="main container pt-10">

          {apiError && <ErrorMessage /> }

          {state.ingredients.length > 0 &&
            (
              <>
                <h1 className="main__title text text_type_main-large mb-5">Соберите бургер</h1>
                <div className="two-columns">
                  <BurgerIngredients ingredients={state.ingredients}/>

                  <div className="order">
                    <BurgerConstructor bun={state.chosen.bun} inner={state.chosen.inner}/>
                    <div className="order__footer mt-5 pr-4">
                      <p className="order__total mr-10">
                        <span className="order__price text text_type_digits-medium">610</span>
                        <CurrencyIcon type={"primary"} />
                      </p>
                      <Button htmlType="button" type="primary" size="large" onClick={showOrderModal}>
                        Оформить заказ
                      </Button>
                    </div>

                    {orderModal && (
                      <Modal onClose={closeOrderModal}>
                        <OrderDetails />
                      </Modal>
                    )}
                  </div>
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