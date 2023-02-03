import { createContext, useContext, useEffect, useReducer } from 'react';
import { appReducer } from './AppReducer';
import { actions } from './AppActions.js';
import { FETCH_FEEDBACK, IS_ERROR, IS_LOADING } from './constant.js';

const initialState = {
  feedback: [],
  theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light',
  editable: {
    idEdit: false,
    item: null,
  },
  isLoading: false,
  isError: false,
};

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(state.theme));
    document.body.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    (async () => {
      dispatch({ type: IS_LOADING, payload: true });
      try {
        dispatch({ type: FETCH_FEEDBACK, payload: await actions.fetch() });
        dispatch({ type: IS_LOADING, payload: false });
      } catch (e) {
        dispatch({ type: IS_ERROR, payload: true });
        console.log(e);
      }
    })();
  }, []);

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
