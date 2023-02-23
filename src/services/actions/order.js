import { placeOrderRequest } from '../burger-api';
import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { RESET_INGREDIENTS } from './ingredients';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';

export const placeOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({type: PLACE_ORDER_REQUEST});

    placeOrderRequest(ingredients)
      .then(res => {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          order: res.order
        })
        dispatch({type: CLEAR_CONSTRUCTOR});
        dispatch({type: RESET_INGREDIENTS});
      })
      .catch(err => {
        dispatch({
          type: PLACE_ORDER_FAILED,
          text: err
        })
      })
  }
}