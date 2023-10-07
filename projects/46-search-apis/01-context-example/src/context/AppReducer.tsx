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
    case TYPES.FETCH_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case TYPES.FETCH_CATEGORY: {
      return {
        ...state,
        category: action.payload,
      };
    }
    case TYPES.SET_CATEGORY: {
      return {
        ...state,
        activeCategory: action.payload,
      };
    }
    case TYPES.LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: false,
      };
    }
    case TYPES.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
