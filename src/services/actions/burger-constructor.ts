import { TIngredient, TConstructorIngredient } from '../types/data';

export const ADD_FILLING_TO_CONSTRUCTOR: 'ADD_FILLING_TO_CONSTRUCTOR' = 'ADD_FILLING_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR: 'ADD_BUN_TO_CONSTRUCTOR' = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_FILLING_FROM_CONSTRUCTOR: 'REMOVE_FILLING_FROM_CONSTRUCTOR' = 'REMOVE_FILLING_FROM_CONSTRUCTOR';
export const UPDATE_FILLING_INGREDIENTS: 'UPDATE_FILLING_INGREDIENTS' = 'UPDATE_FILLING_INGREDIENTS';
export const MOVE_FILLING_INGREDIENTS: 'MOVE_FILLING_INGREDIENTS' = 'MOVE_FILLING_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

// Типизация экшенов
export interface IAddFillingToConstructorAction {
  readonly type: typeof ADD_FILLING_TO_CONSTRUCTOR;
  readonly ingredient: TConstructorIngredient;
}

export interface IAddBunToConstructorAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly bun: TIngredient;
}

export interface IRemoveFillingFromConstructorAction {
  readonly type: typeof REMOVE_FILLING_FROM_CONSTRUCTOR;
  readonly key: string;
}

export interface IUpdateFillingIngredientsAction {
  readonly type: typeof UPDATE_FILLING_INGREDIENTS;
  readonly ingredients: ReadonlyArray<TConstructorIngredient>;
}

export interface IMoveFillingIngredientsAction {
  readonly type: typeof MOVE_FILLING_INGREDIENTS;
  readonly toIndex: number;
  readonly index: number;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions = IAddFillingToConstructorAction | IAddBunToConstructorAction | IRemoveFillingFromConstructorAction | IUpdateFillingIngredientsAction | IMoveFillingIngredientsAction | IClearConstructor;

// Генераторы экшенов
export const addFillingToConstructorAction = (ingredient: TConstructorIngredient): IAddFillingToConstructorAction => ({
  type: ADD_FILLING_TO_CONSTRUCTOR,
  ingredient
});

export const addBunToConstructorAction = (bun: TIngredient): IAddBunToConstructorAction => ({
  type: ADD_BUN_TO_CONSTRUCTOR,
  bun
});

export const removeFillingFromConstructorAction = (key: string): IRemoveFillingFromConstructorAction => ({
  type: REMOVE_FILLING_FROM_CONSTRUCTOR,
  key
});

export const updateFillingIngredientsAction = (ingredients: ReadonlyArray<TConstructorIngredient>): IUpdateFillingIngredientsAction => ({
  type: UPDATE_FILLING_INGREDIENTS,
  ingredients
});

export const moveFillingIngredientsAction = (index: number, toIndex: number): IMoveFillingIngredientsAction => ({
  type: MOVE_FILLING_INGREDIENTS,
  index,
  toIndex
});

export const clearConstructor = (): IClearConstructor => ({
  type: CLEAR_CONSTRUCTOR
})