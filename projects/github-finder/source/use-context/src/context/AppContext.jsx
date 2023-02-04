import { createContext, useContext, useReducer } from 'react';
import { appReducer } from './AppReducer';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com',
  // headers: { Authorization: `token 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` },
});

const initialState = {
  users: [],
  user: null,
  repos: [],
  isLoading: false,
  isError: false,
};

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const searchUsers = async (text) => {
    const { data: { items } } = await API.get(`/search/users?q=${text}`);
    return items;
  };

  const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
      API.get(`/users/${login}`),
      API.get(`/users/${login}/repos?sort=created&per_page=10`),
    ]);

    return { user: user.data, repos: repos.data };
  };

  return <AppContext.Provider value={{ ...state, dispatch, searchUsers, getUserAndRepos }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
