import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_FILLING_TO_CONSTRUCTOR,
  REMOVE_FILLING_FROM_CONSTRUCTOR,
  UPDATE_FILLING_INGREDIENTS,
  MOVE_FILLING_INGREDIENTS
} from '../actions/burger-constructor';

const burgerConstructorInitialState = {
  bun: null,
  filling: []
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
  switch (action.type) {
    case UPDATE_FILLING_INGREDIENTS: {
      return {
        ...state,
        filling: action.ingredients
      }
    }
    case ADD_FILLING_TO_CONSTRUCTOR: {
      return {
        ...state,
        filling: [
          ...state.filling,
          action.ingredient
        ]
      }
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case REMOVE_FILLING_FROM_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling].filter((item) => item.key !== action.key)
      }
    }
    case MOVE_FILLING_INGREDIENTS: {
      state.filling.splice(action.toIndex, 0, state.filling.splice(action.index, 1)[0]);
      return {
        ...state,
        filling: [...state.filling]
      }
    }
    default: {
      return state;
    }
  }
}