export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const TOTAL_AMOUNT = 'TOTAL_AMOUNT';
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

// Reducer helper functions
export const reducerFn = {
  totalAmount: (array) => {
    let { amount, price } = array.reduce((total, { price, amount }) => {
      total.price += price * amount;
      total.amount += amount;
      return total;
    }, { amount: 0, price: 0 });

    return {
      amount,
      price: parseFloat(price.toFixed(2)),
    };
  },
  increase: (array, id) => {
    return array.map(item => item.id === id
      ? { ...item, amount: item.amount + 1 }
      : item);
  },
  decrease: (array, id) => {
    return array
      .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
      .filter(({ amount }) => amount !== 0);
  },
};
