import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  CLEAR_ORDER_INFO,
} from "../actions/order";

const orderInitialState = {
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  orderInfo: {}
}

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
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
        orderInfo: action.order
      }
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderError: action.text,
        orderInfo: {}
      }
    }
    case CLEAR_ORDER_INFO: {
      return {
        ...state,
        orderInfo: {}
      }
    }
    default: {
      return state
    }
  }
}