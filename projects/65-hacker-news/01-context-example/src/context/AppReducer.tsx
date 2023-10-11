// import { YOUR_ACTIONS } from '../utils/constants';
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
    case TYPES.SET_LOADING: {
      return { ...state, isLoading: true };
    }
    case TYPES.SET_STORIES: {
      return { ...state, isLoading: false, hits: action.payload.hits, nbPages: action.payload.nbPages };
    }
    case TYPES.REMOVE_STORY: {
      return { ...state, hits: state.hits.filter(h => h.objectID !== action.payload) };
    }
    case TYPES.HANDLE_SEARCH: {
      return { ...state, query: action.payload, page: 0 };
    }
    case TYPES.HANDLE_PAGE: {
      if (action.payload === 'decrease') {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      if (action.payload === 'increase') {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      break;
    }
    default:
      return state;
  }
};
