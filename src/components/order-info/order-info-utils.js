export const formatIngredients = (orderIngs, allIngs) => {
  const arr = [];
  if (!orderIngs) {
    return arr;
  }
  const ingCounts = {};
  orderIngs.forEach(item => ingCounts[item] = (ingCounts[item] || 0) + 1);

  for (const [id, amount] of Object.entries(ingCounts)) {
    const ingredient = allIngs.find(ing => ing._id === id);
    if (ingredient) {
      arr.push({...ingredient, __v: amount});
    }
  }
  return arr;
}

export const countOrderSum = (ingredients) => {
  return ingredients.reduce((acc, current) => acc + current.price * current.__v, 0)
}

export const orderStatus = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
}