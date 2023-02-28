export const socketMiddlewareOrders = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
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
          // console.log(parsedData);
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