import { createContext, useContext, useReducer } from 'react';
import { appReducer } from './AppReducer';

const initialState = {
  books: [],
  favorite: localStorage.getItem('favoriteBooks') ? JSON.parse(localStorage.getItem('favoriteBooks')) : [],
  book: null,
  isLoading: false,
  isError: false,
};

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
