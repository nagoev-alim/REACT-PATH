import React from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  scores: {
    user: number;
    computer: number;
  };
  message: string;
  isEnd: boolean;
  gameMove: (value: string) => void;
  optionGame: (userChoice: string, computerChoice: string, type: string) => void;
}

export interface Action {
  type: string;
  payload?: any;
}
