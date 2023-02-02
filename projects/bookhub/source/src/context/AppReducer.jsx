import {
  ADD_FAVORITE,
  FETCH_BOOK,
  FETCH_BOOKS,
  IS_ERROR,
  IS_LOADING,
  REMOVE_FROM_FAVORITE,
} from './constant.js';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: payload,
      };
    case FETCH_BOOK:
      return {
        ...state,
        book: payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, payload],
      };
    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(item => item.id !== payload),
      };
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case IS_ERROR: {
      return {
        ...state,
        isError: payload,
      };
    }
    default:
      return state;
  }
};
