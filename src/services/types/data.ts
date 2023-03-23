export type TIngredient = {
  readonly _id: number,
  readonly name: string;
  readonly type: string;
  readonly fat: number;
  readonly carbohydrates: number;
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
  readonly ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TConfirmedOrder = {
  readonly number: number;
}

export type TWsOrdersResponse = {
  readonly success: boolean;
  readonly orders: ReadonlyArray<TOrder>;
  readonly total: string;
  readonly totalToday: string;
}