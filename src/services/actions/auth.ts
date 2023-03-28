import {
  getUserRequest,
  loginRequest,
  logOutRequest,
  accessTokenRequest,
  registerRequest,
  updateUserRequest, forgotPasswordRequest, resetPasswordRequest
} from '../auth-api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser, TUserFull } from '../types/data';
import { TAnyFunc } from '../types/utils';
import { TAppThunk } from '../types';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const USER_LOADED: 'USER_LOADED' = 'USER_LOADED';
export const SAVE_USER: 'SAVE_USER' = 'SAVE_USER';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGIN: 'LOGIN' = 'LOGIN';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

// Типизация экшенов
export interface ISaveUserAction {
  readonly type: typeof SAVE_USER;
  readonly user: TUser;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly err: string;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
}

export interface IUserLoadedAction {
  readonly type: typeof USER_LOADED;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly err: string;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN;
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly err: string;
}
export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly err: string;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly err: string;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT;
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly err: string;
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly err: string;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export type TAuthActions = ISaveUserAction | IGetUserRequestAction | IGetUserFailedAction | IGetUserSuccessAction | IUserLoadedAction | ILoginRequestAction | ILoginFailedAction | ILoginSuccessAction | IRegisterRequestAction | IRegisterFailedAction | IRegisterSuccessAction | IUpdateUserRequestAction | IUpdateUserFailedAction | IUpdateUserSuccessAction | ILogoutRequestAction | ILogoutFailedAction | ILogoutSuccessAction | IForgotPasswordRequestAction | IForgotPasswordFailedAction | IForgotPasswordSuccessAction | IResetPasswordRequestAction | IResetPasswordFailedAction | IResetPasswordSuccessAction;

// Генераторы экшенов
export const saveUserAction = (user: TUser): ISaveUserAction => ({
  type: SAVE_USER,
  user
});

export const getUserRequestAction = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });
export const getUserFailedAction = (err: string): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
  err
});
export const getUserSuccessAction = (): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS })

export const userLoadedAction = (): IUserLoadedAction => ({ type: USER_LOADED });

export const loginRequestAction = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
export const loginFailedAction = (err: string): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  err
});
export const loginSuccessAction = (): ILoginSuccessAction => ({ type: LOGIN });

export const registerRequestAction = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });

export const registerFailedAction = (err: string): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
  err
});
export const registerSuccessAction = (): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS });

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });

export const updateUserFailedAction = (err: string): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
  err
});
export const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user
})

export const logoutRequestAction = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
export const logoutFailedAction = (err: string): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
  err
});
export const logoutSuccessAction = (): ILogoutSuccessAction => ({ type: LOGOUT });

export const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({ type: FORGOT_PASSWORD_REQUEST });
export const forgotPasswordFailedAction = (err: string): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
  err
});
export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });

export const resetPasswordRequestAction = ():IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
export const resetPasswordFailedAction = (err: string): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
  err
});
export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });


const saveAccessToken = (token: string): void => {
  let accessToken;

  if (token.indexOf('Bearer') === 0) {
    accessToken = token.split('Bearer ')[1];
  }

  if (accessToken) {
    setCookie('accessToken', accessToken, {expires: 1200});
  }
}

const saveRefreshToken = (token: string): void => {
  localStorage.setItem('refreshToken', token);
}

interface ISaveUserData {
  readonly user: TUser;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}

const saveTokens = ( { accessToken, refreshToken }: ISaveUserData ): void => {
  if (accessToken) {
    saveAccessToken(accessToken);
  }
  if (refreshToken) {
    saveRefreshToken(refreshToken);
  }
}

export const getUser:TAppThunk = () => (dispatch) => {
  dispatch(getUserRequestAction());
  return getUserRequest()
    .then(res => {
      dispatch(getUserSuccessAction());
      dispatch(loginSuccessAction());
      dispatch(saveUserAction(res.user));
    })
    .catch(err => {
      dispatch(getUserFailedAction(err));

      const refreshToken = localStorage.getItem('refreshToken');
      refreshToken ?
        dispatch(getAccessToken())
        : dispatch(userLoadedAction());
    })
}

export const getAccessToken: TAppThunk = () => (dispatch) => {
  return accessTokenRequest()
    .then((res) => {
      saveAccessToken(res.accessToken);
      dispatch(getUser());
    })
    .catch(err => {
      dispatch(userLoadedAction());
    })
}

export const updateUser: TAppThunk = (form: TUserFull) => (dispatch) => {
  dispatch(updateUserRequestAction());
  return updateUserRequest(form)
    .then(res => {
      dispatch(updateUserSuccessAction(res.user));
    })
    .catch(err => {
      dispatch(updateUserFailedAction(err));
    })
}

export const signIn: TAppThunk = (form: { email: string; password: string }, onSuccess: TAnyFunc) => (dispatch) => {
  dispatch(loginRequestAction());
  return loginRequest(form)
    .then(res => {
      dispatch(loginSuccessAction());
      dispatch(saveUserAction(res.user));
      saveTokens(res);
      localStorage.removeItem('loggedOut');
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(err => {
      dispatch(loginFailedAction(err));
    })
}

export const signOut: TAppThunk = (successCb: TAnyFunc) => (dispatch) => {
  dispatch(logoutRequestAction());
  return logOutRequest()
    .then(res => {
      dispatch(logoutSuccessAction());
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('loggedOut', 'true');
      if (successCb) {
        successCb();
      }
    })
    .catch(err => {
      dispatch(logoutFailedAction(err));
    })
}

export const register: TAppThunk = (form: TUserFull) => (dispatch) => {
  dispatch(registerRequestAction());
  return registerRequest(form)
    .then(res => {
      dispatch(registerSuccessAction());
      dispatch(userLoadedAction());
      dispatch(loginSuccessAction());
      dispatch(saveUserAction(res.user));
      saveTokens(res);
    })
    .catch(err => {
      dispatch(registerFailedAction(err));
    })
}

export const forgotPassword: TAppThunk = (email: string, successCb: TAnyFunc) => (dispatch) => {
  dispatch(forgotPasswordRequestAction());
  return forgotPasswordRequest(email)
    .then(res => {
      dispatch(forgotPasswordSuccessAction())
      setCookie('forgotPassword', 'true', {expires: 1200});
      if (successCb) {
        successCb();
      }
    })
    .catch(err => {
      dispatch(forgotPasswordFailedAction(err));
    })
}

export const resetPassword: TAppThunk = (form: { password: string; token: string }, successCb: TAnyFunc) => (dispatch) => {
  dispatch(resetPasswordRequestAction());
  return resetPasswordRequest(form)
    .then(res => {
      dispatch(resetPasswordSuccessAction());
      deleteCookie('forgotPassword');
      if (successCb) {
        successCb();
      }
    })
    .catch(err => {
      dispatch(resetPasswordFailedAction(err));
    })
}
