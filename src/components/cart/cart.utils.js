export const countSum = (data) => {
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
