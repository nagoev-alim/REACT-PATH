import React from 'react';

export interface IAppState {
  posts: [],
  isLoading: boolean,
  isError: boolean,
  editStatus: {
    item: {},
    isEdit: boolean,
  },
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
