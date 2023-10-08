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
    case TYPES.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case TYPES.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case TYPES.EDIT_POST:
      return {
        ...state,
        editStatus: {
          item: action.payload.item,
          isEdit: action.payload.isEdit,
        },
      };
    case TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.payload.id ? { ...action.payload.data, post } : post),
      };
    case TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case TYPES.LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
        isError: false,
      };
    case TYPES.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
