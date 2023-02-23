import { getCookie } from '../utils/cookie';
import { request } from './base-api';

export const loginRequest = (form) => {
  return request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}

export const registerRequest = (form) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}

export const getUserRequest = () => {
  return request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    }
  })
}

export const accessTokenRequest = () => {
  return request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })
}

export const updateUserRequest = (form) => {
  return request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(form)
  })
}

export const logOutRequest = () => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })
}

export const forgotPasswordRequest = (email) => {
  return request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
}

export const resetPasswordRequest = (form) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}