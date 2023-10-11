import { createContext, useContext, useEffect, useReducer } from 'react';
import { IAppContextProps, IAppState } from '../types';
import { reducer } from './AppReducer.tsx';
import { TYPES } from '../utils/constants.ts';
import axios from 'axios';

const initialState: IAppState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
};

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


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
        dispatch({ type: TYPES.SET_LOADING });
        const {
          data: {
            hits,
            nbPages,
          },
        } = await axios.get(`https://hn.algolia.com/api/v1/search?query=${state.query}&page=${state.page}`);
        dispatch({ type: TYPES.SET_STORIES, payload: { hits, nbPages } });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.query, state.page]);

  function removeStory(payload:string): void {
    dispatch({ type: TYPES.REMOVE_STORY, payload });
  }

  function searchStory(payload: string): void {
    dispatch({ type: TYPES.HANDLE_SEARCH, payload });
  }

  function handlePage(payload: string): void {
    dispatch({ type: TYPES.HANDLE_PAGE, payload });
  }

  return (
    <AppContext.Provider value={{ ...state, dispatch, removeStory, searchStory, handlePage }}>
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
