import { Action, IAppState } from '../types';
import { TYPES } from '../utils/constants.ts';

/**
 * Редуктор для управления состоянием.
 * @param {IAppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {IAppState} Новое состояние.
 */
export const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case TYPES.FETCH_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case TYPES.FETCH_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    case TYPES.ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case TYPES.REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(item => item.id !== action.payload),
      };
    case TYPES.IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case TYPES.IS_ERROR: {
      return {
        ...state,
        isError: action.payload,
      };
    }
    default:
      return state;
  }
};
