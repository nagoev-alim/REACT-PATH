import { Action, IAppState } from '../types';
import { TYPES } from '../utils/constants.ts';

const reducerFn = {
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

/**
 * Редуктор для управления состоянием.
 * @param {IAppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {IAppState} Новое состояние.
 */
export const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case TYPES.TOTAL_AMOUNT: {
      return {
        ...state,
        totalPrice: reducerFn.totalAmount(state.products).price,
        totalCount: reducerFn.totalAmount(state.products).amount,
      };
    }
    case TYPES.REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };
    }
    case TYPES.CLEAR_PRODUCTS: {
      return {
        ...state,
        products: [],
      };
    }
    case TYPES.INCREASE: {
      return {
        ...state,
        products: reducerFn.increase(state.products, action.payload),
      };
    }
    case TYPES.DECREASE: {
      return {
        ...state,
        products: reducerFn.decrease(state.products, action.payload),
      };
    }
    default:
      return state;
  }
};
