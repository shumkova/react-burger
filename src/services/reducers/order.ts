import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  CLEAR_ORDER_INFO, TPlaceOrderActions,
} from '../actions/order';
import {TConfirmedOrder} from "../types/data";

type TOrderState = {
  orderRequest: boolean,
  orderFailed: boolean,
  orderError: string | null,
  orderInfo: TConfirmedOrder | null
}

const orderInitialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderError: null,
  orderInfo: null
}

export const orderReducer = (state = orderInitialState, action: TPlaceOrderActions) => {
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
        orderInfo: action.order,
        orderError: null
      }
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderError: action.err,
        orderInfo: null
      }
    }
    case CLEAR_ORDER_INFO: {
      return {
        ...state,
        orderInfo: null
      }
    }
    default: {
      return state
    }
  }
}