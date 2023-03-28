import { BUN, MAIN, SAUCE } from '../../utils/consts';

export type TIngredient = {
  readonly _id: string,
  readonly name: string;
  readonly type: string;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly proteins: number
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TConstructorIngredient = TIngredient & {
  key: string;
}

export type TUser = {
  readonly email: string;
  readonly name: string;
}

export type TTokens = {
  readonly refreshToken: string;
  readonly accessToken: string;
}

export type TUserFull = TUser & { password: string };

export type TOrder = {
  readonly name: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TConfirmedOrder = {
  readonly number?: string;
}

export type TIngredientTypes = typeof BUN | typeof SAUCE | typeof MAIN;