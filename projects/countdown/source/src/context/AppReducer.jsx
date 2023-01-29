import { CONSTANTS } from './constant';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case CONSTANTS.TOGGLE_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case CONSTANTS.SET_COUNTDOWN:
      return {
        ...state,
        title: payload.title,
        date: payload.date,
      };
    case CONSTANTS.END_TIMER:
      return {
        ...state,
        endTimer: true,
      };
    case CONSTANTS.RESET_COUNTDOWN:
      return {
        ...state,
        title: null,
        date: null,
        showForm: true,
        endTimer: false,
      };
    default:
      return state;
  }
};
