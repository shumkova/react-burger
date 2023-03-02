import {
  WS_ORDERS_SUCCESS,
  WS_ORDERS_ERROR,
  WS_ORDERS_CLOSE,
  WS_ORDERS_CLOSED,
  WS_GET_ORDERS,

  WS_USER_ORDERS_SUCCESS,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CLOSED,
  WS_GET_USER_ORDERS
} from '../actions/ws-orders';

const initialState = {
  wsOrdersConnected: false,
  wsUserOrdersConnected: false,
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  ordersError: null,
  userOrdersError: null
};

export const wsOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_SUCCESS: {
      return {
        ...state,
        wsOrdersConnected: true,
        ordersError: null
      }
    }
    case WS_ORDERS_ERROR: {
      return {
        ...state,
        wsOrdersConnected: false,
        ordersError: action.payload
      }
    }
    case WS_ORDERS_CLOSE: {
      return {
        ...state,
        orders: [],
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

    case WS_USER_ORDERS_SUCCESS: {
      return {
        ...state,
        wsUserOrdersConnected: true,
        userOrdersError: null
      }
    }
    case WS_USER_ORDERS_ERROR: {
      return {
        ...state,
        wsUserOrdersConnected: false,
        userOrdersError: action.payload
      }
    }
    case WS_USER_ORDERS_CLOSE: {
      return {
        ...state,
        userOrders: [],
      }
    }
    case WS_USER_ORDERS_CLOSED: {
      return {
        ...state,
        userOrders: [],
        wsUserOrdersConnected: false,
      }
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        userOrders: action.orders,
      }
    }

    default: {
      return state
    }
  }
}