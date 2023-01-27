import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  CHANGE_SCORE,
} from './actionsTypes.js';


export const actionHandlers = {
  category: payload => ({ type: CHANGE_CATEGORY, payload }),
  difficulty: payload => ({ type: CHANGE_DIFFICULTY, payload }),
  type: payload => ({ type: CHANGE_TYPE, payload }),
  amount: payload => ({ type: CHANGE_AMOUNT, payload }),
  score: payload => ({ type: CHANGE_SCORE, payload }),
};

