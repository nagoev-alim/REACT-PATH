import { createContext, useContext, useReducer } from 'react';
import { appReducer } from './AppReducer';

const AppContext = createContext(null);
const useAppHook = () => useContext(AppContext);
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer,
    {
      showForm: !localStorage.getItem('countdown'),
      title: localStorage.getItem('countdown') ? JSON.parse(localStorage.getItem('countdown')).title : null,
      date: localStorage.getItem('countdown') ? JSON.parse(localStorage.getItem('countdown')).date : null,
      endTimer: false,
    });

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
