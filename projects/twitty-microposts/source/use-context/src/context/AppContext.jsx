import { createContext, useContext, useEffect, useReducer } from 'react';
import { appReducer } from './AppReducer';
import { ERROR, FETCH_POSTS, LOADING } from './constant.js';
import { actionHandlers } from './AppActions.js';

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  editStatus: {
    item: {},
    isEdit: false,
  },
};

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: LOADING });
        dispatch({
          type: FETCH_POSTS,
          payload: await actionHandlers.fetchPosts(),
        });
        dispatch({ type: LOADING });
      } catch (e) {
        dispatch({ type: ERROR });
        console.log(e);
      }
    })();
  }, []);

  return <AppContext.Provider value={{ ...state, dispatch }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
