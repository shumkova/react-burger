const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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

export {getIngredientsRequest, placeOrderRequest};