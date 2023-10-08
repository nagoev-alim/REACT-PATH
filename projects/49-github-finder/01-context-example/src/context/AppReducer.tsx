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
    case TYPES.FETCH_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case TYPES.FETCH_USER_AND_REPOS: {
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
      };
    }
    case TYPES.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
        isError: false,
      };
    }
    case TYPES.SET_ERROR: {
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };
    }
    case TYPES.CLEAR_USERS: {
      return {
        ...state,
        users: [],
      };
    }
    default:
      return state;
  }
};
