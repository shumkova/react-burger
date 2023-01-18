import {placeOrderRequest} from '../burger-api';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const placeOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_REQUEST
    });

    placeOrderRequest(ingredients)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PLACE_ORDER_SUCCESS,
            order: res.order
          })
          dispatch({
            type: OPEN_ORDER_MODAL
          })
        } else {
          dispatch({
            type: PLACE_ORDER_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PLACE_ORDER_FAILED,
          text: err
        })
      })
  }
}