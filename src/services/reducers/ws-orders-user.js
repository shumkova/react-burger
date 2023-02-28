import {
  WS_USER_ORDERS_START,
  WS_USER_ORDERS_SUCCESS,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_CLOSED,
  WS_GET_USER_ORDERS
} from '../actions/ws-orders-user';

const initialState = {
  wsUserOrdersConnected: false,
  wsUserOrdersConnecting : false,
  userOrders: [],
  userTotal: 0,
  userTotalToday: 0,
  userOrdersError: null
};

export const wsUserOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDERS_START: {
      return {
        ...state,
        wsUserOrdersConnecting: true,
      }
    }
    case WS_USER_ORDERS_SUCCESS: {
      return {
        ...state,
        wsUserOrdersConnected: true,
        wsUserOrdersConnecting: false,
        userOrdersError: null
      }
    }
    case WS_USER_ORDERS_ERROR: {
      return {
        ...state,
        wsUserOrdersConnected: false,
        wsUserOrdersConnecting: false,
        userOrdersError: action.payload
      }
    }
    case WS_USER_ORDERS_CLOSED: {
      return {
        ...state,
        wsUserOrdersConnected: false,
      }
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        userOrders: action.orders,
        userTotal: action.total,
        userTotalToday: action.totalToday
      }
    }
    default: {
      return {...state}
    }
  }
}