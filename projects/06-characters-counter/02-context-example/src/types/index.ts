import React, { ChangeEvent } from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  charactersState: {
    text: string;
    chars: number;
    words: number;
    spaces: number;
    letters: number;
  };
}

export interface Action {
  type: string;
  payload?: any;
}
