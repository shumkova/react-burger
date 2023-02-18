import { checkResponse } from './burger-api';
import { getCookie } from '../utils/cookie';

const baseUrl = 'https://norma.nomoreparties.space/api';

export const loginRequest = (form) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }).then(checkResponse)
}

export const registerRequest = (form) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }).then(checkResponse)
}

export const getUserRequest = () => {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    }
  }).then(checkResponse)
}

export const accessTokenRequest = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  }).then(checkResponse)
}

export const logOutRequest = () => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  }).then(checkResponse)
}

export const forgotPasswordRequest = (email) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  }).then(checkResponse)
}

export const resetPasswordRequest = (form) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }).then(checkResponse)
}