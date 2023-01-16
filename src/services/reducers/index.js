import { combineReducers } from 'redux';

import {
  TAB_SWITCH,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_AMOUNT,
  DECREASE_INGREDIENT_AMOUNT,
  SET_CONSTRUCTOR_INGREDIENTS,
  ADD_FILLING_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  OPEN_DETAILS_MODAL,
  CLOSE_DETAILS_MODAL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILED, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL, REMOVE_FILLING_FROM_CONSTRUCTOR
}
  from '../actions';

const appInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsError: ''
}

const burgerIngredientsInitialState = {
  currentTab: 'bun',
  modal: false,
  ingredientDetails: null
}

const cartInitialState = {
  constructorIngredients: {
    bun: null,
    filling: [],
  },
  orderModal: false,
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  orderNumber: null
}

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        ingredientsError: action.text ? action.text : ''
      }
    }
    case INCREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item['_id'] === action.id ? {
            ...item,
            '__v': item['__v'] + 1
          } : item
        )
      }
    }
    case DECREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
            item['_id'] === action.id ? {
              ...item,
              '__v': item['__v'] - 1
            } : item
          )}
    }
    default: {
      return state;
    }
  }
}

const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
    case OPEN_DETAILS_MODAL: {
      return {
        ...state,
        modal: true,
        ingredientDetails: action.ingredient
      }
    }
    case CLOSE_DETAILS_MODAL: {
      return {
        ...state,
        modal: false,
        ingredientDetails: null
      }
    }
    default: {
      return state;
    }
  }
}

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: {
          bun: action.data.find((item) => item.type === 'bun'),
          filling: action.data.filter((item) => item.type !== 'bun').slice(0, Math.floor(Math.random()*action.data.length)),
        }
      }
    }
    case ADD_FILLING_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          filling: [
            ...state.constructorIngredients.filling,
            action.ingredient
          ]
        }
      }
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          bun: action.bun
        }
      }
    }
    case REMOVE_FILLING_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          filling: [...state.constructorIngredients.filling.filter((item, index) => index !== action.index)]
        }
      }
    }
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.orderNumber
      }
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderError: action.text
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        orderModal: true
      }
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        orderModal: false
      }
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  app: appReducer,
  burgerIngredients: burgerIngredientsReducer,
  cart: cartReducer
})