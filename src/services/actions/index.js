import {getIngredientsRequest, placeOrderRequest} from '../burger-api';

export const TAB_SWITCH = 'TAB_SWITCH';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_CONSTRUCTOR_INGREDIENTS = 'SET_CONSTRUCTOR_INGREDIENTS';
export const OPEN_DETAILS_MODAL = 'OPEN_DETAILS_MODAL';
export const CLOSE_DETAILS_MODAL = 'CLOSE_DETAILS_MODAL';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    getIngredientsRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })

          dispatch({
            type: SET_CONSTRUCTOR_INGREDIENTS,
            data: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          text: err
        })
      })
  }
}

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
            orderNumber: res.order.number
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