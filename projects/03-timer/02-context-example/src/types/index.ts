import React from 'react';

export interface ITimer {
  minutes: number,
  seconds: number,
  timeLeft: number,
}

export interface IAppState {
}

export interface IAppContextProps {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
  buttonIcon: JSX.Element;
  showForm: boolean;
  timer: ITimer,
  handleSubmit: () => void;
  handleStart: () => void;
  handleReset: () => void;
  handleClick: () => void;
}

export interface Action {
  type: string;
  payload?: any;
}
