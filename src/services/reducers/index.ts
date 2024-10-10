import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { menuReducer } from './menu';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientsReducer } from './ingredients';
import { authReducer } from './auth';
import { wsOrdersReducer } from './ws-orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  menu: menuReducer,
  constructorIngredients: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  orders: wsOrdersReducer,
})