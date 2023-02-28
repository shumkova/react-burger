import {getCookie} from "../../utils/cookie";

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
          // console.log('onopen event');
          // console.log(event);
          dispatch({type: onOpen, payload: event});
        }

        socket.onerror = event => {
          // console.log('onerror event');
          // console.log(event);
          dispatch({type: onError, payload: event});
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { orders } = parsedData;
          dispatch({type: onOrders, orders});
        }

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        }
      }

      next(action);
    }
  }
}