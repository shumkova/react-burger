import {TWsActions} from '../store';
import { Middleware } from 'redux';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onOrders } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl + payload);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({type: onOpen, payload: event});
        }

        socket.onerror = (event: Event) => {
          dispatch({type: onError, payload: event});
        }

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({type: onOrders, ...restParsedData});
        }

        socket.onclose = (event: Event) => {
          dispatch({type: onClose, payload: event});
        }

        if (type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    }
  }
}