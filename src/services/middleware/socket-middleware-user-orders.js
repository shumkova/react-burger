import { getCookie } from '../../utils/cookie';

export const socketMiddlewareUserOrders = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;
      const { user } = getState().auth;

      if (type === wsInit && user) {
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
      }

      next(action);
    }
  }
}