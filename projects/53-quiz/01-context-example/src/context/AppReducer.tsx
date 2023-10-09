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
    case TYPES.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case TYPES.CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
    case TYPES.CHANGE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case TYPES.CHANGE_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case TYPES.CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};
