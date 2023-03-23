import { TOrder } from '../types/data';

export const WS_ORDERS_START: 'WS_ORDERS_START' = 'WS_ORDERS_START';
export const WS_ORDERS_CLOSE: 'WS_ORDERS_CLOSE' = 'WS_ORDERS_CLOSE';
export const WS_ORDERS_SUCCESS: 'WS_ORDERS_SUCCESS' = 'WS_ORDERS_SUCCESS';
export const WS_ORDERS_ERROR: 'WS_ORDERS_ERROR' = 'WS_ORDERS_ERROR';
export const WS_ORDERS_CLOSED: 'WS_ORDERS_CLOSED' = 'WS_ORDERS_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export const WS_USER_ORDERS_START: 'WS_USER_ORDERS_START' = 'WS_USER_ORDERS_START';
export const WS_USER_ORDERS_CLOSE: 'WS_USER_ORDERS_CLOSE' = 'WS_USER_ORDERS_CLOSE';
export const WS_USER_ORDERS_SUCCESS: 'WS_USER_ORDERS_SUCCESS' = 'WS_USER_ORDERS_SUCCESS';
export const WS_USER_ORDERS_ERROR: 'WS_USER_ORDERS_ERROR' = 'WS_USER_ORDERS_ERROR';
export const WS_USER_ORDERS_CLOSED: 'WS_USER_ORDERS_CLOSED' = 'WS_USER_ORDERS_CLOSED';
export const WS_GET_USER_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS';

interface IWsOrdersStartAction {
  readonly type: typeof WS_ORDERS_START
}

interface IWsOrdersCloseAction {
  readonly type: typeof WS_ORDERS_CLOSE
}

interface IWsOrdersSuccessAction {
  readonly type: typeof WS_ORDERS_SUCCESS;
}

interface IWsOrdersErrorAction {
  readonly type: typeof WS_ORDERS_ERROR;
  readonly payload: string;
}

interface IWsOrdersClosedAction {
  readonly type: typeof WS_ORDERS_CLOSED;
}

interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly orders: ReadonlyArray<TOrder>;
  readonly total: number;
  readonly totalToday: number;
}

interface IWsUserOrdersStartAction {
  readonly type: typeof WS_USER_ORDERS_START
}

interface IWsUserOrdersCloseAction {
  readonly type: typeof WS_USER_ORDERS_CLOSE
}

interface IWsUserOrdersSuccessAction {
  readonly type: typeof WS_USER_ORDERS_SUCCESS;
}

interface IWsUserOrdersErrorAction {
  readonly type: typeof WS_USER_ORDERS_ERROR;
  readonly payload: string;
}

interface IWsUserOrdersClosedAction {
  readonly type: typeof WS_USER_ORDERS_CLOSED;
}

interface IWsUserGetOrdersAction {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly orders: ReadonlyArray<TOrder>;
}

export type TWsOrdersActions = IWsOrdersStartAction | IWsOrdersCloseAction | IWsOrdersSuccessAction | IWsOrdersErrorAction | IWsOrdersClosedAction | IWsGetOrdersAction | IWsUserOrdersStartAction | IWsUserOrdersCloseAction | IWsUserOrdersSuccessAction | IWsUserOrdersErrorAction | IWsUserOrdersClosedAction | IWsUserGetOrdersAction;