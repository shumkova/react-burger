import {getIngredientsRequest} from '../burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_AMOUNT = 'INCREASE_INGREDIENT_AMOUNT';
export const DECREASE_INGREDIENT_AMOUNT = 'DECREASE_INGREDIENT_AMOUNT';

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
        } else {
          return Promise.reject('что-то пошло не так');
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

