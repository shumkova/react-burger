import { placeOrderRequest } from '../burger-api';
import { clearConstructor } from './burger-constructor';
import { resetIngredientsAction } from './ingredients';
import { TConfirmedOrder } from '../types/data';
import { TAppThunk } from '../types';

export const PLACE_ORDER_REQUEST: 'PLACE_ORDER_REQUEST' = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS: 'PLACE_ORDER_SUCCESS' = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED: 'PLACE_ORDER_FAILED' = 'PLACE_ORDER_FAILED';
export const CLEAR_ORDER_INFO: 'CLEAR_ORDER_INFO' = 'CLEAR_ORDER_INFO';

interface IPlaceOrderRequestAction {
  readonly type: typeof PLACE_ORDER_REQUEST;
}

interface IPlaceOrderSuccessAction {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly order: TConfirmedOrder
}
interface IPlaceOrderFailedAction {
  readonly type: typeof PLACE_ORDER_FAILED;
  readonly err: string;
}
interface IClearOrderInfoAction {
  readonly type: typeof CLEAR_ORDER_INFO
}

export type TPlaceOrderActions = IPlaceOrderRequestAction | IPlaceOrderSuccessAction | IPlaceOrderFailedAction | IClearOrderInfoAction;

export const placeOrderRequestAction = (): IPlaceOrderRequestAction => ({
  type: PLACE_ORDER_REQUEST
});

export const placeOrderSuccessAction = (order: TConfirmedOrder): IPlaceOrderSuccessAction => ({
  type: PLACE_ORDER_SUCCESS,
  order
});

export const placeOrderFailedAction = (err: string): IPlaceOrderFailedAction => ({
  type: PLACE_ORDER_FAILED,
  err
});

export const clearOrderInfoAction = (): IClearOrderInfoAction => ({
  type: CLEAR_ORDER_INFO
});


export const placeOrder: TAppThunk = (ingredients: Array<string>) => (dispatch) => {
  dispatch(placeOrderRequestAction());

  return placeOrderRequest(ingredients)
    .then(res => {
      dispatch(placeOrderSuccessAction(res.order));
      dispatch(clearConstructor());
      dispatch(resetIngredientsAction());
    })
    .catch(err => {
      dispatch(placeOrderFailedAction(err));
    })
}