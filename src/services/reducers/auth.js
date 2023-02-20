import {
  GET_USER_SUCCESS,
  LOGOUT,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  USER_LOADED,
  LOGIN_REQUEST,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS
} from '../actions/auth';

const authInitialState = {
  user: null,
  userLoaded: false,
  userRequest: false,
  userFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
  userError: ''
}

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
        userLoaded: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userRequest: false,
        userFailed: false,
        userLoaded: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
        userError: action.err
      }
    }
    case USER_LOADED: {
      return {
        ...state,
        userLoaded: true
      }
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
        userError: action.err
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: action.user
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        userError: action.err
      }
    }
    case LOGIN: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        userError: action.err
      }
    }
    case LOGOUT: {
      return {
        ...authInitialState,
        userLoaded: true
      }
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true,
        userError: action.err
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: true
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
        resetPasswordSuccess: false
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
        userError: action.err
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        forgotPasswordSuccess: true
      }
    }

    default: {
      return state
    }
  }
}