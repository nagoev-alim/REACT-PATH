import React from 'react';

export interface Users {
}

export interface User {
}

export interface Repos {
}

export interface IAppState {
  users: [],
  user: null,
  repos: [],
  isLoading: boolean,
  isError: boolean,
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  searchUsers: (text: string) => Promise<void>;
  getUserAndRepos: (login: string) => Promise<{ user: any; repos: any[] }>;
}

export interface Action {
  type: string;
  payload?: any;
}
