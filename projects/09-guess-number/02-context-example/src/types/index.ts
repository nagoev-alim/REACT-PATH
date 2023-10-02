import React, { FormEvent } from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  inputRef: HTMLInputElement | null;
  user: string | null;
  guess: {
    number: number,
    message: string,
    isGuessed: boolean
  }[];
}

export interface Action {
  type: string;
  payload?: any;
}
