export const TYPES = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FROM_FAVORITE: 'REMOVE_FROM_FAVORITE',
  IS_LOADING: 'IS_LOADING',
  FETCH_BOOKS: 'FETCH_BOOKS',
  FETCH_BOOK: 'FETCH_BOOK',
  IS_ERROR: 'IS_ERROR',
} as const;

export const BASE_URL: string = 'https://openlibrary.org/search.json?title=';
export const BASE_SINGLE_URL: string = 'https://openlibrary.org/works/';
