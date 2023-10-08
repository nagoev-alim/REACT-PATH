import { createContext, useContext, useReducer } from 'react';
import { IAppContextProps, IAppState } from '../types';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../utils/constants.ts';
import { reducer } from './AppReducer.tsx';

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
});


const initialState: IAppState = {
  users: [],
  user: null,
  repos: [],
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

  async function searchUsers(text: string): Promise<void> {
    const { data: { items } } = await API.get(`/search/users?q=${text}`);
    return items;
  }

  async function getUserAndRepos(login: string): Promise<{ user: any; repos: any[] }> {
    const [user, repos] = await Promise.all([
      API.get(`/users/${login}`),
      API.get(`/users/${login}/repos?sort=created&per_page=10`),
    ]);
    console.log(user.data);
    console.log(repos.data);
    return { user: user.data, repos: repos.data };
  }

  return (
    <AppContext.Provider value={{ ...state, dispatch, searchUsers, getUserAndRepos }}>
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
