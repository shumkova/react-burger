import {GET_USER_SUCCESS, LOGOUT, GET_USER_FAILED, GET_USER_REQUEST, USER_LOADED} from '../actions/auth';

const authInitialState = {
  user: null,
  userLoaded: false,
  userRequest: false,
  userFailed: false,
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
        userError: action.text
      }
    }
    case USER_LOADED: {
      return {
        ...state,
        userLoaded: true
      }
    }
    case LOGOUT: {
      return authInitialState
    }

    default: {
      return state
    }
  }
}