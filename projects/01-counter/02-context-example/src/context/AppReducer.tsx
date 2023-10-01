import { COUNTER_ACTIONS } from '../utils/constants';
import { Action, AppState } from '../types';

/**
 * Редуктор для управления состоянием счетчика.
 * @param {AppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {AppState} Новое состояние счетчика.
 */
export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case COUNTER_ACTIONS.DECREASE:
      return { ...state, counter: state.counter - 1 };
    case COUNTER_ACTIONS.INCREASE:
      return { ...state, counter: state.counter + 1 };
    case COUNTER_ACTIONS.RESET:
      return { ...state, counter: 0 };
    default:
      return state;
  }
};
