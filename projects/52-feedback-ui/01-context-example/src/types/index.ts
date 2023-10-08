import React from 'react';

export interface IAppState {
  feedback: [],
  theme: string,
  editable: {
    idEdit: boolean,
    item: null,
  },
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
