import {
  getUserRequest,
  loginRequest,
  logOutRequest,
  accessTokenRequest,
  registerRequest,
  updateUserRequest, forgotPasswordRequest, resetPasswordRequest
} from '../auth-api';
import {deleteCookie, setCookie} from '../../utils/cookie';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'SET_USER';
export const USER_LOADED = 'USER_LOADED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN = 'LOGIN';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT = 'LOGOUT';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


const saveAccessToken = (token) => {
  let accessToken;

  if (token.indexOf('Bearer') === 0) {
    accessToken = token.split('Bearer ')[1];
  }

  if (accessToken) {
    setCookie('accessToken', accessToken, {expires: 1200});
  }
}

const saveRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
}

const saveUser = (user, dispatch) => {
  dispatch({
    type: GET_USER_SUCCESS,
    user
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
          dispatch({
            type: LOGIN
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
          err
        })

        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          dispatch(getAccessToken());
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
          dispatch(getUser());
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: USER_LOADED
        })
      })
  }
}

export const updateUser = (form) => {
  console.log('updateUser');
  return (dispatch) => {
    updateUserRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user
          })
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_USER_FAILED,
          err
        })
      })
  }
}

export const signIn = (form, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(form)
      .then(res => {
        if (res && res.success) {
          saveUser(res.user, dispatch);
          if (res.accessToken) {
            saveAccessToken(res.accessToken);
          }
          if (res.refreshToken) {
            saveRefreshToken(res.refreshToken);
          }
          dispatch({ type: LOGIN });
          localStorage.removeItem('loggedOut');
          if (onSuccess) {
            onSuccess();
          }
        } else {
          return Promise.reject('что-то пошло не так');
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          err
        })
      })
  }
}

export const signOut = (successCb) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    logOutRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({ type: LOGOUT });
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          localStorage.setItem('loggedOut', 'true');
          if (successCb) {
            successCb();
          }
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          err
        })
      })
  }
}

export const register = (form) => {
  return (dispatch) => {
    dispatch({type: REGISTER_REQUEST});
    registerRequest(form)
      .then(res => {
        if (res && res.success) {
          saveUser(res.user, dispatch);
          if (res.accessToken) {
            saveAccessToken(res.accessToken);
          }
          if (res.refreshToken) {
            saveRefreshToken(res.refreshToken);
          }
          dispatch({type: REGISTER_SUCCESS});
          dispatch({type: USER_LOADED});
          dispatch({type: LOGIN});
        } else {
          return Promise.reject('что-то пошло не так');
        }
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FAILED,
          err
        })
      })
  }
}

export const forgotPassword = (email, successCb) => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    forgotPasswordRequest(email)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS
          })
          setCookie('forgotPassword', 'true', {expires: 1200});
          if (successCb) {
            successCb();
          }
        } else {
          return Promise.reject('Пользователя с таким адресом электронной почты не существует');
        }
      })
      .catch(err => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          err
        })
      })
  }
}

export const resetPassword = (form, successCb) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    resetPasswordRequest(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS
          })
          deleteCookie('forgotPassword');
          if (successCb) {
            successCb();
          }
        } else {
          return Promise.reject('Неправильный код');
        }
      })
      .catch(err => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          err
        })
      })
  }
}
