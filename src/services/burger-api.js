const baseUrl = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // return res.ok ? res.json() : Promise.reject(res);
}

const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`).then(checkResponse)
}

const placeOrderRequest = (ingredientsArr) => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': ingredientsArr
    })
  }).then(checkResponse)
}

export { getIngredientsRequest, placeOrderRequest};