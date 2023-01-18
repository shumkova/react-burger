import { CLOSE_DETAILS_MODAL, OPEN_DETAILS_MODAL, TAB_SWITCH } from '../actions/menu';

const menuInitialState = {
  currentTab: 'bun',
  modal: false,
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