import { request, TResponseBody } from './base-api';
import { getCookie } from '../utils/cookie';
import { TConfirmedOrder, TIngredient } from './types/data';

const getIngredientsRequest = (): Promise<TResponseBody<{ data: ReadonlyArray<TIngredient> }>> => request('ingredients');

const placeOrderRequest = (ingredientsArr: Array<string>): Promise<TResponseBody<{ order: TConfirmedOrder }>> => {
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