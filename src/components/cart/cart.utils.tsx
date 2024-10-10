import { TBurgerConstructorState } from "../../services/reducers/burger-constructor";

export const countSum = (data: TBurgerConstructorState): number => {
  const { bun, filling } = data;
  let sum = 0;

  if (bun) {
    sum += bun.price*2;
  }

  if (filling.length > 0) {
    sum += filling.reduce((price, item) => price + item.price, 0);
  }

  return sum;
}
