import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {getIngredients, postOrder} from '../../services/burger-api';
import ErrorBoundary from '../error-boundary/error-doundary';
import ErrorMessage from '../error-message/error-message';
import {ConstructorContext} from '../../services/ingredientsContext';

const App = () => {
  const [ingredients, setIngredients] = React.useState([])

  const [constructorIngredients, setConstructorIngredients] = React.useState({
    bun: null,
    filling: []
  })

  const [orderSum, setOrderSum] = React.useState(0);
  const [apiError, setApiError] = React.useState(null);
  const [orderModal, setOrderModal] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const countSum = (data) => {
    const { bun, filling } = data;
    let sum = 0;

    if (bun) {
      sum += bun.price*2;
    }

    if (filling.length > 0) {
      sum += filling.reduce((price, item) => price + item.price, 0);
    }

    return sum;
  }

  const showOrderModal = (evt) => {
    setOrderModal(true);
  }

  const closeOrderModal = () => {
    setOrderModal(false);
  }

  const placeOrder = (evt) => {
    evt.preventDefault();
    const ids = [constructorIngredients.bun['_id'], ...constructorIngredients.filling.map((item) => item['_id'])];
    postOrder(ids)
      .then((res) => {
        setOrderNumber(res.order.number);
        showOrderModal();
      })
      .catch((err) => {
        setApiError(err.message);
      })
  }

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        setApiError(null);
        setIngredients(res.data)
        setConstructorIngredients({
          bun: res.data.find((item) => item.type === 'bun'),
          filling: res.data.filter((item) => item.type !== 'bun').slice(0, Math.floor(Math.random()*res.data.length)),
        })

      })
      .catch((err) => {
        setApiError(err.message);
      })
  }, [])

  React.useEffect(() => {
    setOrderSum(countSum(constructorIngredients));
  }, [constructorIngredients]);

  return (
    <ErrorBoundary>
      <div className="page">
        <AppHeader activeLink={'main'}/>
        <main className="main container pt-10">

          {apiError && <ErrorMessage /> }

          {ingredients.length > 0 &&
            (
              <>
                <h1 className="main__title text text_type_main-large mb-5">Соберите бургер</h1>
                <div className="two-columns">
                  <BurgerIngredients ingredients={ingredients}/>

                  <div className="order">
                    <ConstructorContext.Provider value={{constructorIngredients, setConstructorIngredients}}>
                      <BurgerConstructor />

                      <div className="order__bottom mt-5 pr-4">
                        <p className="order__total mr-10">
                          <span className="order__price text text_type_digits-medium">{orderSum}</span>
                          <CurrencyIcon type={"primary"} />
                        </p>
                        <Button htmlType="button" type="primary" size="large" onClick={placeOrder}>
                          Оформить заказ
                        </Button>
                      </div>
                    </ConstructorContext.Provider>

                    {orderModal && (
                      <Modal onClose={closeOrderModal}>
                        <OrderDetails number={orderNumber}/>
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