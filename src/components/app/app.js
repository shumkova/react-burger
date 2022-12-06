import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data.json';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const App = () => {
  const [state, setState] = React.useState({
    chosen: {
      bun: data.find((item) => item.type === 'bun'),
      inner: data.filter((item) => item.type !== 'bun').slice(0, 1),
    },
  })

  return (
    <div className="page">
      <AppHeader activeLink={'main'}/>
      <main className="main container pt-10">
        <h1 className="main__title text text_type_main-large mb-5">Соберите бургер</h1>
        <div className="two-columns">
          <BurgerIngredients ingredients={data}/>

          <div className="order">
            <BurgerConstructor bun={state.chosen.bun} inner={state.chosen.inner}/>
            <div className="order__footer mt-5 pr-4">
              <p className="order__total mr-10">
                <span className="order__price text text_type_digits-medium">610</span>
                <CurrencyIcon type={"primary"} />
              </p>
              <Button htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default App;