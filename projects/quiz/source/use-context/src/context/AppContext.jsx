import { createContext, useContext, useReducer } from 'react';
import { appReducer } from './AppReducer';

const initialState = {
  category: '',
  difficulty: '',
  type: '',
  amount: 10,
  score: 0,
};

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer,initialState);

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
