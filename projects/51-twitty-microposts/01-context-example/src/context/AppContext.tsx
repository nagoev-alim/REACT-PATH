import { createContext, useContext, useEffect, useReducer } from 'react';
import { IAppContextProps, IAppState } from '../types';
import { reducer } from './AppReducer.tsx';
import { TYPES } from '../utils/constants.ts';
import { actionHandlers } from './AppActions.tsx';

const initialState: IAppState = {
  posts: [],
  isLoading: false,
  isError: false,
  editStatus: {
    item: {},
    isEdit: false,
  },
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

  useEffect(function() {
    (async () => {
      try {
        dispatch({ type: TYPES.LOADING });
        dispatch({
          type: TYPES.FETCH_POSTS,
          payload: await actionHandlers.fetchPosts(),
        });
        dispatch({ type: TYPES.LOADING });
      } catch (e) {
        dispatch({ type: TYPES.ERROR });
        console.log(e);
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
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
