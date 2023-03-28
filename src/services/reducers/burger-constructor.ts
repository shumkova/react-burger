import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_FILLING_TO_CONSTRUCTOR,
  REMOVE_FILLING_FROM_CONSTRUCTOR,
  UPDATE_FILLING_INGREDIENTS,
  MOVE_FILLING_INGREDIENTS, CLEAR_CONSTRUCTOR, TBurgerConstructorActions
} from '../actions/burger-constructor';
import { TConstructorIngredient, TIngredient } from '../types/data';

export type TBurgerConstructorState = {
  bun: TIngredient | null;
  filling: ReadonlyArray<TConstructorIngredient>;
}

const burgerConstructorInitialState: TBurgerConstructorState = {
  bun: null,
  filling: []
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action: TBurgerConstructorActions) => {
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
      const fillingArr = [...state.filling];
      fillingArr.splice(action.toIndex, 0, fillingArr.splice(action.index, 1)[0]);
      return {
        ...state,
        filling: fillingArr
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {...burgerConstructorInitialState}
    }
    default: {
      return state;
    }
  }
}