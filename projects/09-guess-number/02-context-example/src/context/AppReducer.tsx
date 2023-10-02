import { TIMER_ACTION } from '../utils/constants';
import { Action, IAppState } from '../types';

/**
 * Редуктор для управления состоянием.
 * @param {IAppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {IAppState} Новое состояние.
 */
export const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case TIMER_ACTION.TOGGLE_FORM:
      return { ...state, showForm: !state.showForm };
    case TIMER_ACTION.SET_COUNTDOWN:
      return { ...state, title: action.payload.title, date: action.payload.date };
    case TIMER_ACTION.END_TIMER:
      return { ...state, endTimer: true };
    case TIMER_ACTION.RESET_COUNTDOWN:
      return { ...state, title: null, date: null, showForm: true, endTimer: false };
    default:
      return state;
  }
};
