import {
  ADD_FEEDBACK, EDIT_FEEDBACK,
  FETCH_FEEDBACK,
  IS_ERROR,
  IS_LOADING,
  TOGGLE_THEME,
  UPDATE_FEEDBACK,
} from './constant.js';

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: payload,
      };
    }
    case FETCH_FEEDBACK: {
      return {
        ...state,
        feedback: payload,
      };
    }
    case ADD_FEEDBACK: {
      return {
        ...state,
        feedback: [...state.feedback, payload],
      };
    }
    case UPDATE_FEEDBACK: {
      return {
        ...state,
        feedback: state.feedback.map(f => f.id === payload.id
          ? { ...f, title: payload.title, rating: payload.rating }
          : { f },
        ),
      };
    }
    case EDIT_FEEDBACK: {
      return {
        ...state,
        editable: {
          isEdit: payload.isEdit,
          item: payload.item,
        },
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
        isError: false,
      };
    }
    case IS_ERROR: {
      return {
        ...state,
        isError: payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
