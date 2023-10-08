import { createContext, useContext, useEffect, useReducer } from 'react';
import { IAppContextProps, IAppState } from '../types';
import { reducer } from './AppReducer.tsx';
import { TYPES } from '../utils/constants.ts';
import { actionHandlers, actions } from './AppActions.tsx';

const theme = localStorage.getItem('theme');
const initialState = {
  feedback: [],
  theme: theme ? JSON.parse(theme) : 'light',
  editable: {
    idEdit: false,
    item: null,
  },
  isLoading: false,
  isError: false,
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
    localStorage.setItem('theme', JSON.stringify(state.theme));
    // document.body.setAttribute('class', state.theme);
    document.querySelector(':root')!.className = state.theme
  }, [state.theme]);

  useEffect(() => {
    (async () => {
      dispatch({ type: TYPES.IS_LOADING, payload: true });
      try {
        dispatch({ type: TYPES.FETCH_FEEDBACK, payload: await actions.fetch() });
        dispatch({ type: TYPES.IS_LOADING, payload: false });
      } catch (e) {
        dispatch({ type: TYPES.IS_ERROR, payload: true });
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
