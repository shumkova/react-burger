import { TIngredient } from '../../services/types/data';

export const formatIngredients = (orderIngs: ReadonlyArray<string>, allIngs: ReadonlyArray<TIngredient>): Array<TIngredient> => {
  const arr: Array<TIngredient> = [];
  if (!orderIngs) {
    return arr;
  }
  const ingCounts: {[name: string]: number} = {};
  orderIngs.forEach(item => ingCounts[item] = (ingCounts[item] || 0) + 1);

  for (const [id, amount] of Object.entries(ingCounts)) {
    const ingredient = allIngs.find(ing => ing._id === id);
    if (ingredient) {
      arr.push({...ingredient, __v: amount});
    }
  }
  return arr;
}

export const countOrderSum = (ingredients: Array<TIngredient>) => {
  return ingredients.reduce((acc, current) => acc + current.price * current.__v, 0)
}

interface IOrderStatus {
  [name: string]: string
}

export const orderStatus: IOrderStatus  = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
}