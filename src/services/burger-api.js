import { request } from './base-api';
import {getCookie} from "../utils/cookie";

const getIngredientsRequest = () => request('ingredients');

const placeOrderRequest = (ingredientsArr) => {
  return request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer: ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      'ingredients': ingredientsArr
    })
  })
}

export { getIngredientsRequest, placeOrderRequest};