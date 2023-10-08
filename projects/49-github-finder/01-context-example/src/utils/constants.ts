export const TYPES = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER_AND_REPOS: 'FETCH_USER_AND_REPOS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_USERS: 'CLEAR_USERS',
} as const;

export const API_URL: string = 'https://api.github.com';
