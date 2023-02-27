import {
  SET_ACTIVE_ORDER,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
} from "../actions/ws";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: null
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
      }
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: state.orders.length ? [...state.orders, action.payload.orders] : action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    }
    default: {
      return {...state}
    }
  }
}