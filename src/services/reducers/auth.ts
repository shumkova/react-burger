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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS, TAuthActions, SAVE_USER
} from '../actions/auth';
import { TUser } from '../types/data';

type TAuthState = {
  user: TUser | null,
  loggedIn: boolean,
  userLoaded: boolean,

  userRequest: boolean,
  userFailed: boolean,

  updateUserRequest: boolean,
  updateUserFailed: boolean,

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,

  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  forgotPasswordSuccess: boolean,

  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  resetPasswordSuccess: boolean,

  registerRequest: boolean,
  registerFailed: boolean,

  userError: string | null
}

const authInitialState: TAuthState = {
  user: null,
  loggedIn: false,
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

  registerRequest: false,
  registerFailed: false,

  userError: null
}

export const authReducer = (state = authInitialState, action: TAuthActions) => {
  switch (action.type) {
    case SAVE_USER: {
      return {
        ...state,
        user: action.user
      }
    }
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
        userRequest: false,
        userFailed: false,
        userLoaded: true,
        userError: null
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
        user: action.user,
        userError: null
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
        loginFailed: false,
        loggedIn: true,
        userError: null
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
        ...state,
        user: null,
        userLoaded: true,
        loggedIn: false,
        userError: null
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
        forgotPasswordSuccess: true,
        userError: null
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
        forgotPasswordSuccess: true,
        userError: null
      }
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false
      }
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        userError: action.err
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        userError: null
      }
    }

    default: {
      return state
    }
  }
}