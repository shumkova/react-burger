import { request } from './base-api';

const getIngredientsRequest = () => request('ingredients');

const placeOrderRequest = (ingredientsArr) => {
  return request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': ingredientsArr
    })
  })
}

export { getIngredientsRequest, placeOrderRequest};