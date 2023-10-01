import React from 'react';

export interface IAppState {
  showForm: boolean;
  title: string | null;
  date: string | null;
  endTimer: boolean;
}

export interface IAppContextProps extends IAppState{
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
