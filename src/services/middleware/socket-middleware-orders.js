import {getCookie} from "../../utils/cookie";

export const socketMiddlewareOrders = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsInitUser, wsClose, onOpen, onClose, onError, onOrders } = wsActions;
      const { user } = getState().auth;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitUser && user) {
        const accessToken = getCookie('accessToken');
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        }

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({type: onOrders, ...restParsedData});
        }

        socket.onclose = event => {
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