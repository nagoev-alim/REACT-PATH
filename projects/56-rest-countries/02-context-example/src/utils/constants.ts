export const TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_BORDERS: 'SET_BORDERS',
  SET_FILTERED: 'SET_FILTERED',
  SET_THEME: 'SET_THEME',
} as const;

export const BASE_URL: string = 'https://restcountries.com/v2/';
export const ALL_COUNTRIES_URL: string = `${BASE_URL}all?fields=name,capital,flags,population,region`;
export const searchByCountry = (name: string): string => `${BASE_URL}name/${name}`;
export const filterByCode = (codes: string[]): string => `${BASE_URL}alpha?codes=${codes.join(',')}`;
