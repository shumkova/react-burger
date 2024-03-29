export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onOrders } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl + payload);
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