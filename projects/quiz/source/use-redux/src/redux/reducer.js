import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  CHANGE_SCORE,
} from './actionsTypes.js';

const initialState = {
  category: '',
  difficulty: '',
  type: '',
  amount: 10,
  score: 0,
};

export const reducer = (state = initialState, { type, payload }) => {
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
