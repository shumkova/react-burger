import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import {
  WS_ORDERS_START,
  WS_ORDERS_SUCCESS,
  WS_ORDERS_ERROR,
  WS_ORDERS_CLOSED,
  WS_GET_ORDERS,
  WS_USER_ORDERS_START,
  WS_USER_ORDERS_SUCCESS,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_CLOSED,
  WS_GET_USER_ORDERS, WS_ORDERS_CLOSE, WS_USER_ORDERS_CLOSE
} from './actions/ws-orders';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export type TWsActions = {
  wsInit: string,
  wsClose: string,
  onOpen: string,
  onError: string,
  onClose: string,
  onOrders: string
}

export const wsActionsOrders: TWsActions = {
  wsInit: WS_ORDERS_START,
  wsClose: WS_ORDERS_CLOSE,
  onOpen: WS_ORDERS_SUCCESS,
  onError: WS_ORDERS_ERROR,
  onClose: WS_ORDERS_CLOSED,
  onOrders: WS_GET_ORDERS
};

export const wsActionsUserOrders: TWsActions = {
  wsInit: WS_USER_ORDERS_START,
  wsClose: WS_USER_ORDERS_CLOSE,
  onOpen: WS_USER_ORDERS_SUCCESS,
  onError: WS_USER_ORDERS_ERROR,
  onClose: WS_USER_ORDERS_CLOSED,
  onOrders: WS_GET_USER_ORDERS
};

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActionsOrders), socketMiddleware(wsUrl, wsActionsUserOrders)));

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    enhancer
  );