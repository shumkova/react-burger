import { getCookie } from '../utils/cookie';
import { request, TRegisterRequest, TResponseBody } from './base-api';
import { TTokens, TUser, TUserFull } from './types/data';

export const loginRequest = (form: { email: string; password: string}): Promise<TResponseBody<TRegisterRequest>> => {
  return request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}

export const registerRequest = (form: TUserFull): Promise<TResponseBody<TRegisterRequest>> => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}

export const getUserRequest = (): Promise<TResponseBody<{ user: TUser }>> => {
  return request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
  })
}

export const accessTokenRequest = (): Promise<TResponseBody<TTokens>> => {
  return request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
}

export const updateUserRequest = (form: TUserFull): Promise<TResponseBody<{ user: TUser }>> => {
  return request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(form)
  })
}

export const logOutRequest = (): Promise<TResponseBody> => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })
}

export const forgotPasswordRequest = (email: string): Promise<TResponseBody> => {
  return request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
}

export const resetPasswordRequest = (form: { password: string; token: string }): Promise<TResponseBody> => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
}