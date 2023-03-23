import { getIngredientsRequest } from '../burger-api';
import { TIngredient } from '../types/data';
import { TAppDispatch, TAppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_AMOUNT: 'INCREASE_INGREDIENT_AMOUNT' = 'INCREASE_INGREDIENT_AMOUNT';
export const DECREASE_INGREDIENT_AMOUNT: 'DECREASE_INGREDIENT_AMOUNT' = 'DECREASE_INGREDIENT_AMOUNT';

export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';

// Типизация экшенов
interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly err: string;
}

interface IIncreaseIngredientAmountAction {
  readonly type: typeof INCREASE_INGREDIENT_AMOUNT;
  readonly id: number;
}

interface IDecreaseIngredientAmountAction {
  readonly type: typeof DECREASE_INGREDIENT_AMOUNT;
  readonly id: number;
}

interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export type TIngredientsActions = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction | IIncreaseIngredientAmountAction | IDecreaseIngredientAmountAction | IResetIngredientsAction;

// Генераторы экшенов
export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (err: string): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
  err
});

export const getIngredientsSuccessAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
})

export const increaseIngredientAmountAction = (id: number): IIncreaseIngredientAmountAction => ({
  type: INCREASE_INGREDIENT_AMOUNT,
  id
});

export const decreaseIngredientAmountAction = (id: number): IDecreaseIngredientAmountAction => ({
  type: DECREASE_INGREDIENT_AMOUNT,
  id
});

export const resetIngredientsAction = (): IResetIngredientsAction => ({
  type: RESET_INGREDIENTS
})

export const getIngredientsThunk: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch(getIngredientsRequestAction());

  getIngredientsRequest()
    .then(res => {
      dispatch(getIngredientsSuccessAction(res.data));
    })
    .catch(err => {
      dispatch(getIngredientsFailedAction(err));
    })
}

