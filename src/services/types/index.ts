import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../../index';

import {TAuthActions} from '../actions/auth';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TIngredientsActions} from '../actions/ingredients';
import {TMenuActions} from '../actions/menu';
import {TPlaceOrderActions} from '../actions/order';
import {TWsOrdersActions} from '../actions/ws-orders';

export type TAppActions = TAuthActions
  | TBurgerConstructorActions
  | TIngredientsActions
  | TMenuActions
  | TPlaceOrderActions
  | TWsOrdersActions;

export type TRootState = ReturnType<typeof store.getState>;

// export type TAppDispatch = typeof store.dispatch;
export type TAppDispatch = ThunkDispatch<TRootState, any, TAppActions>

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TAppActions>
  >;
