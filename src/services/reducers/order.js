import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL
} from "../actions/order";

const orderInitialState = {
  orderModal: false,
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  orderInfo: null
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
        orderInfo: null
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
      return state
    }
  }
}