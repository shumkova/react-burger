const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const getIngredients = () => {
  return fetch(`${baseUrl}/ingredients`).then(checkResponse)
}

export {getIngredients};