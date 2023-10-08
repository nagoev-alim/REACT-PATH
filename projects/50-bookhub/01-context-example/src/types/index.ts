import React from 'react';

export interface IBook {
  author: string[];
  cover_id: string;
  edition_count: number;
  first_publish_year: number;
  id: string;
  title: string;
}

export interface IAppState {
  books: [],
  favorite: IBook[] | [],
  book: null,
  isLoading: boolean,
  isError: boolean,
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
