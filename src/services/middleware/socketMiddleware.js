export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInitAll, wsInitUser, onOpen, onClose, onError, onOrders } = wsActions;
      const { user } = getState().auth;

      if (type === wsInitAll) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitUser && user) {
        socket = new WebSocket(`${wsUrl}?token=${user.accessToken}`);
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
          // console.log('onmessage event');
          const { data } = event;
          const parsedData = JSON.parse(data);
          // console.log(parsedData);
          const { success, ...restParsedData } = parsedData;
          dispatch({type: onOrders, payload: restParsedData});
        }

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        }
      }

      next(action);
    }
  }
}