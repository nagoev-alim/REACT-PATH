import {
  CLEAR_PRODUCTS,
  DECREASE,
  FETCH_PRODUCTS,
  INCREASE,
  reducerFn,
  REMOVE_PRODUCT,
  TOTAL_AMOUNT,
} from './constant.js';

// Reducer
export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    case TOTAL_AMOUNT: {
      return {
        ...state,
        totalPrice: reducerFn.totalAmount(state.products).price,
        totalCount: reducerFn.totalAmount(state.products).amount,
      };
    }
    case REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(p => p.id !== payload),
      };
    }
    case CLEAR_PRODUCTS: {
      return {
        ...state,
        products: [],
      };
    }
    case INCREASE: {
      return {
        ...state,
        products: reducerFn.increase(state.products, payload),
      };
    }
    case DECREASE: {
      return {
        ...state,
        products: reducerFn.decrease(state.products, payload),
      };
    }
    default:
      return state;
  }
};
