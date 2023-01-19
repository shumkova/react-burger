import {placeOrderRequest} from '../burger-api';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';

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
        } else {
          return Promise.reject('что-то пошло не так');
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