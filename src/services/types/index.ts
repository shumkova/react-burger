import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { ActionCreator } from 'redux';

import {TAuthActions} from '../actions/auth';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TIngredientsActions} from '../actions/ingredients';
import {TMenuActions} from '../actions/menu';
import {TPlaceOrderActions} from '../actions/order';
import {TWsOrdersActions} from '../actions/ws-orders';
import { rootReducer } from '../reducers';

export type TAppActions = TAuthActions
  | TBurgerConstructorActions
  | TIngredientsActions
  | TMenuActions
  | TPlaceOrderActions
  | TWsOrdersActions;

export type TRootState = ReturnType<typeof rootReducer>;

export type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

export type TAppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, TRootState, unknown, TAppActions>>;
