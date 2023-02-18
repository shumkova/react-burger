import {getUserRequest, loginRequest, logOutRequest, accessTokenRequest, registerRequest} from '../auth-api';
import {setCookie} from '../../utils/cookie';

export const GET_USER_SUCCESS = 'SET_USER';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT = 'LOGOUT';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const USER_LOADED = 'USER_LOADED';

const saveAccessToken = (token) => {
  let accessToken;

  if (token.indexOf('Bearer') === 0) {
    accessToken = token.split('Bearer ')[1];
  }

  if (accessToken) {
    setCookie('accessToken', accessToken, {expires: 1200});
  }
}

const saveUser = (res, dispatch) => {
  if (res.accessToken) {
    saveAccessToken(res.accessToken);
  }

  if (res.refreshToken) {
    localStorage.setItem('refreshToken', res.refreshToken);
  }

  dispatch({
    type: GET_USER_SUCCESS,
    user: res.user
  })
}

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    getUserRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
          text: err
        })

        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          getAccessToken();
        } else {
          dispatch({
            type: USER_LOADED
          })
        }
      })
  }
}

export const getAccessToken = () => {
  return (dispatch) => {
    accessTokenRequest()
      .then((res) => {
        if (res && res.success) {
          saveAccessToken(res.accessToken);
          getUser();
        }
      })
      .catch(err => {
        dispatch({
          type: USER_LOADED
        })
      })
  }
}

export const signIn = (form) => {
  return (dispatch) => {
    loginRequest(form)
      .then(res => {
        if (res && res.success) {
          saveUser(res, dispatch);
        } else {
          return Promise.reject('что-то пошло не так');
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_REQUEST_FAILED,
          text: err
        })
      })
  }
}

export const signOut = () => {
  return (dispatch) => {
    logOutRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT,
          })
          localStorage.removeItem('refreshToken');
        }
      })
  }
}

export const register = (form) => {
  return (dispatch) => {
    registerRequest(form)
      .then(res => {
        if (res && res.success) {
          saveUser(res, dispatch);
        } else {
          return Promise.reject('что-то пошло не так');
        }
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FAILED,
          text: err
        })
      })
  }
}


