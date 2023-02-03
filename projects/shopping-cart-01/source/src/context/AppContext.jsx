import { createContext, useContext, useEffect, useReducer } from 'react';
import { appReducer } from './AppReducer';
import { FETCH_PRODUCTS, TOTAL_AMOUNT } from './constant.js';
import mock from '../mock/mock.json';

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    products: [],
    totalPrice: 0,
    totalCount: 0,
  });

  // Fetch products
  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: mock,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // Get total amount
  useEffect(() => {
    dispatch({ type: TOTAL_AMOUNT });
  }, [state.products]);

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
