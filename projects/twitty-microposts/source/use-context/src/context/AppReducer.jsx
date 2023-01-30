import { ADD_POST, DELETE_POST, EDIT_POST, ERROR, FETCH_POSTS, LOADING, UPDATE_POST } from './constant.js';

export const appReducer = (state, { type, payload }) => {
  console.log({ type, payload });
  switch (type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case EDIT_POST:
      return {
        ...state,
        editStatus: {
          item: payload.item,
          isEdit: payload.isEdit,
        },
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post.id === payload.id ? { ...payload.data, post } : post),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload),
      };
    case LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
        isError: false,
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
