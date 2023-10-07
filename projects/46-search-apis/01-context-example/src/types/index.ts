import React from 'react';

export interface IAppState {
  categories: [] | null;
  category: [] | null;
  activeCategory: string;
  loading: boolean;
  error: boolean;
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  handleSearchByTitle: (category: string) => void;
  fetchCategory: (category: string) => void;
}

export interface Action {
  type: string;
  payload?: any;
}
