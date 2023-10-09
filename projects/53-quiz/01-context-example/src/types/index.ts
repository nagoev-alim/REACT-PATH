import React from 'react';

export interface IAppState {
  category: string,
  difficulty: string,
  type: string,
  amount: number,
  score: number,
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
