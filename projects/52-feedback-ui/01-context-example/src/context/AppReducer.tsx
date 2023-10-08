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
    case TYPES.TOGGLE_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case TYPES.FETCH_FEEDBACK: {
      return {
        ...state,
        feedback: action.payload,
      };
    }
    case TYPES.ADD_FEEDBACK: {
      return {
        ...state,
        feedback: [...state.feedback, action.payload],
      };
    }
    case TYPES.UPDATE_FEEDBACK: {
      return {
        ...state,
        feedback: state.feedback.map(f => f.id === action.payload.id
          ? { ...f, title: action.payload.title, rating: action.payload.rating }
          : { f },
        ),
      };
    }
    case TYPES.EDIT_FEEDBACK: {
      return {
        ...state,
        editable: {
          isEdit: action.payload.isEdit,
          item: action.payload.item,
        },
      };
    }
    case TYPES.IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
        isError: false,
      };
    }
    case TYPES.IS_ERROR: {
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
