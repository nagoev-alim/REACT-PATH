import { createContext, useContext, useEffect, useReducer } from 'react';
import { IAppContextProps, IAppState } from '../types';
import axios from 'axios';
import { reducer } from './AppReducer.tsx';
import { TYPES } from '../utils/constants.ts';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);

axios.defaults.baseURL = 'https://api.publicapis.org/';

const initialState: IAppState = {
  categories: null,
  category: null,
  activeCategory: 'Animals',
  loading: false,
  error: false,
};

/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: TYPES.LOADING, payload: true });
        const [dataCategories, dataCategory] = await Promise.all([
          await axios.get('categories'),
          await axios.get(`entries?category=${state.activeCategory}`),
        ]);
        dispatch({ type: TYPES.FETCH_CATEGORIES, payload: dataCategories.data });
        dispatch({ type: TYPES.FETCH_CATEGORY, payload: dataCategory.data });
        dispatch({ type: TYPES.LOADING, payload: false });
      } catch (e) {
        dispatch({ type: TYPES.ERROR, payload: true });
        console.log(e);
      }
    })();
  }, []);

  async function fetchCategory(category: string): Promise<void> {
    try {
      dispatch({ type: TYPES.LOADING, payload: true });
      const { data: payload } = await axios.get(`entries?category=${category}`);
      dispatch({ type: TYPES.FETCH_CATEGORY, payload });
      dispatch({ type: TYPES.SET_CATEGORY, payload: category });
      dispatch({ type: TYPES.LOADING, payload: false });
    } catch (e) {
      dispatch({ type: TYPES.ERROR, payload: true });
      console.log(e);
    }
  }

  async function handleSearchByTitle(category: string): Promise<void> {
    try {
      dispatch({ type: TYPES.LOADING, payload: true });
      const { data: payload } = await axios.get(`entries?title=${category}`);
      dispatch({ type: TYPES.FETCH_CATEGORY, payload });
      dispatch({ type: TYPES.SET_CATEGORY, payload: '' });
      dispatch({ type: TYPES.LOADING, payload: false });
    } catch (e) {
      dispatch({ type: TYPES.ERROR, payload: true });
      console.log(e);
    }
  }

  return (
    <AppContext.Provider value={{ ...state, dispatch, handleSearchByTitle, fetchCategory }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
