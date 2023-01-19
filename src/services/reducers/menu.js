import { CLEAR_INGREDIENT_DETAILS, SET_INGREDIENTS_DETAILS, TAB_SWITCH } from '../actions/menu';
import {BUN} from '../../utils/consts';

const menuInitialState = {
  currentTab: BUN,
  ingredientDetails: null
}

export const menuReducer = (state = menuInitialState, action) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
    case SET_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredient
      }
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      }
    }
    default: {
      return state;
    }
  }
}