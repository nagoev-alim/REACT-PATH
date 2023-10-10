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
    case TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        isError: false,
      };
    case TYPES.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case TYPES.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case TYPES.SET_FILTERED:
      return {
        ...state,
        filtered: action.payload,
      };
    case TYPES.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case TYPES.SET_BORDERS:
      return {
        ...state,
        countryBorders: action.payload,
      };
    case TYPES.SET_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};
