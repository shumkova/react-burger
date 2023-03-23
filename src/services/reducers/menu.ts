import { TAB_SWITCH, TMenuActions } from '../actions/menu';
import { IngredientTypes } from '../../utils/consts';

type TMenuState = {
  currentTab: IngredientTypes
}

const menuInitialState: TMenuState = {
  currentTab: IngredientTypes.bun,
}

export const menuReducer = (state = menuInitialState, action: TMenuActions) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.tab
      };
    }
    default: {
      return state;
    }
  }
}