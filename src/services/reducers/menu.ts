import { TAB_SWITCH, TMenuActions } from '../actions/menu';
import { BUN } from '../../utils/consts';

type TMenuState = {
  currentTab: string;
}

const menuInitialState: TMenuState = {
  currentTab: BUN,
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