import {
  WS_ORDERS_START,
  WS_ORDERS_SUCCESS,
  WS_ORDERS_ERROR,
  WS_ORDERS_CLOSED,
  WS_GET_ORDERS
} from '../actions/ws-orders';

const initialState = {
  wsOrdersConnected: false,
  wsOrdersConnecting : false,
  orders: [],
  total: 0,
  totalToday: 0,
  ordersError: null
};

export const wsAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_START: {
      return {
        ...state,
        wsOrdersConnecting: true,
      }
    }
    case WS_ORDERS_SUCCESS: {
      return {
        ...state,
        wsOrdersConnected: true,
        wsOrdersConnecting: false,
        ordersError: null
      }
    }
    case WS_ORDERS_ERROR: {
      return {
        ...state,
        wsOrdersConnected: false,
        wsOrdersConnecting: false,
        ordersError: action.payload
      }
    }
    case WS_ORDERS_CLOSED: {
      return {
        ...state,
        wsOrdersConnected: false,
      }
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
        total: action.total,
        totalToday: action.totalToday
      }
    }
    default: {
      return {...state}
    }
  }
}