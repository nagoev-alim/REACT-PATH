import React from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  word: string;
  hint: string;
  time: number;
  inputRef: HTMLInputElement | null;
  btnRef: HTMLButtonElement | null;
  initGame: () => void;
  checkWord: () => void;
}

export interface Action {
  type: string;
  payload?: any;
}
