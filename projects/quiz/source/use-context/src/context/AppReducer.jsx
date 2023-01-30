import { CHANGE_AMOUNT, CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_SCORE, CHANGE_TYPE } from './constant.js';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: payload,
      };
    case CHANGE_TYPE:
      return {
        ...state,
        type: payload,
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount: payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: payload,
      };
    default:
      return state;
  }
};
