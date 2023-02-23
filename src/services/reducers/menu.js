import { TAB_SWITCH } from '../actions/menu';
import { BUN } from '../../utils/consts';

const menuInitialState = {
  currentTab: BUN,
}

export const menuReducer = (state = menuInitialState, action) => {
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