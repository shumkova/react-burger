import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { menuReducer } from './menu';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientsReducer } from './ingredients';
import { appReducer } from './app';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  app: appReducer,
  ingredients: ingredientsReducer,
  menu: menuReducer,
  constructorIngredients: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
})