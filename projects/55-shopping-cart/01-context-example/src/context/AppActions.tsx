import { TYPES } from '../utils/constants.ts';

export const actionHandlers = {
  category: (payload) => ({ type: TYPES.CHANGE_CATEGORY, payload }),
  difficulty: (payload) => ({ type: TYPES.CHANGE_DIFFICULTY, payload }),
  type: (payload) => ({ type: TYPES.CHANGE_TYPE, payload }),
  amount: (payload) => ({ type: TYPES.CHANGE_AMOUNT, payload }),
  score: (payload) => ({ type: TYPES.CHANGE_SCORE, payload }),
};
