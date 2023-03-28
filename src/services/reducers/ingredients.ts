import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_AMOUNT,
  DECREASE_INGREDIENT_AMOUNT, RESET_INGREDIENTS, TIngredientsActions,
}
  from '../actions/ingredients';
import { TIngredient } from '../types/data';

type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsError: null | string
}

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsError: null
}

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions) => {
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
        ingredientsError: null
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: true,
        ingredientsError: action.err
      }
    }
    case INCREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item._id === action.id ? {
            ...item,
            __v: item.__v + 1
          } : item
        )
      }
    }
    case DECREASE_INGREDIENT_AMOUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item._id === action.id ? {
            ...item,
            __v: item.__v - 1
          } : item
        )}
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item.__v > 0 ? {
            ...item,
            __v: 0
          } : item
        )}
    }
    default: {
      return state;
    }
  }
}