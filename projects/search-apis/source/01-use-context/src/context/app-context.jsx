import { createContext, useContext, useEffect, useReducer } from 'react';
import { REDUCER_TYPES } from '../utils/constants/reducer.constants.js';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.publicapis.org/';

/* ======================
🚀 Initial State
====================== */
const INITIAL_STATE = {
  categories: null,
  category: null,
  activeCategory: 'Animals',
  loading: false,
  error: false,
};

/* ======================
🚀 Reducer
====================== */
const reducer = (state, { type, payload }) => {
  console.log(`🚀 Reducer:`, { type, payload });

  switch (type) {
    case REDUCER_TYPES.FETCH_CATEGORIES: {
      return {
        ...state,
        categories: payload,
      };
    }
    case REDUCER_TYPES.FETCH_CATEGORY: {
      return {
        ...state,
        category: payload,
      };
    }
    case REDUCER_TYPES.SET_CATEGORY: {
      return {
        ...state,
        activeCategory: payload,
      };
    }
    case REDUCER_TYPES.LOADING: {
      return {
        ...state,
        loading: payload,
        error: false,
      };
    }
    case REDUCER_TYPES.ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

/* ======================
🚀 Context
====================== */
export const Context = createContext(null);

export const useContextHook = () => useContext(Context);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Fetch categories
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: REDUCER_TYPES.LOADING, payload: true });
        const [dataCategories, dataCategory] = await Promise.all([
          await axios.get('categories'),
          await axios.get(`entries?category=${state.activeCategory}`),
        ]);
        dispatch({ type: REDUCER_TYPES.FETCH_CATEGORIES, payload: dataCategories.data });
        dispatch({ type: REDUCER_TYPES.FETCH_CATEGORY, payload: dataCategory.data });
        dispatch({ type: REDUCER_TYPES.LOADING, payload: false });
      } catch (e) {
        dispatch({ type: REDUCER_TYPES.ERROR, payload: true });
        console.log(e);
      }
    })();
  }, []);

  const fetchCategory = async (category) => {
    try {
      dispatch({ type: REDUCER_TYPES.LOADING, payload: true });
      const { data: payload } = await axios.get(`entries?category=${category}`);
      dispatch({ type: REDUCER_TYPES.FETCH_CATEGORY, payload });
      dispatch({ type: REDUCER_TYPES.SET_CATEGORY, payload: category });
      dispatch({ type: REDUCER_TYPES.LOADING, payload: false });
    } catch (e) {
      dispatch({ type: REDUCER_TYPES.ERROR, payload: true });
      console.log(e);
    }
  };

  const searchByTitle = async (category) => {
    try {
      dispatch({ type: REDUCER_TYPES.LOADING, payload: true });
      const { data: payload } = await axios.get(`entries?title=${category}`);
      dispatch({ type: REDUCER_TYPES.FETCH_CATEGORY, payload });
      dispatch({ type: REDUCER_TYPES.SET_CATEGORY, payload: '' });
      dispatch({ type: REDUCER_TYPES.LOADING, payload: false });
    } catch (e) {
      dispatch({ type: REDUCER_TYPES.ERROR, payload: true });
      console.log(e);
    }
  };


  return <Context.Provider
    value={{ ...state, dispatch, fetchCategory,searchByTitle }}
  >
    {children}
  </Context.Provider>;
};
