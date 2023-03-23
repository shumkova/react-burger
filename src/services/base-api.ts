import { TUser } from './types/data';

const BASE_URL: string = 'https://norma.nomoreparties.space/api/';

export type TRequestOptions = {
  method: string;
  headers: { [key: string]: string };
  body?: string;
}

export type TResponseBody<T> = {
  success: boolean;
  message?: string;
  headers?: Headers;
} & T;

export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

export type TRegisterRequest = {
  readonly user: TUser;
  readonly accessToken: string;
  readonly refreshToken: string;
}

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: TResponseBody<any>) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: string, options?: TRequestOptions) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};