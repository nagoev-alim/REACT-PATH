import { REDUCER } from '../utils/constants/reducer.constants.js';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case REDUCER.FETCH_USERS: {
      return {
        ...state,
        users: payload,
      };
    }
    case REDUCER.FETCH_USER_AND_REPOS: {
      return {
        ...state,
        user: payload.user,
        repos: payload.repos,
      };
    }
    case REDUCER.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
        isError: false,
      };
    }
    case REDUCER.SET_ERROR: {
      return {
        ...state,
        isError: payload,
        isLoading: false,
      };
    }
    case REDUCER.CLEAR_USERS: {
      return {
        ...state,
        users: [],
      };
    }
    default:
      return state;
  }
};
