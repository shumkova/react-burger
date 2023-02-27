import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
} from './actions/ws';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInitAll: WS_CONNECTION_START_ALL,
  wsInitUser: WS_CONNECTION_START_USER,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS
};

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    enhancer
  );