import { request, TResponseBody } from './base-api';
import { getCookie } from '../utils/cookie';
import { TConfirmedOrder } from './types/data';

const getIngredientsRequest = () => request('ingredients');

const placeOrderRequest = (ingredientsArr: Array<string>): Promise<TResponseBody<TConfirmedOrder>> => {
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

export { getIngredientsRequest, placeOrderRequest };