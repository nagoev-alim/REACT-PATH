import React from 'react';

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface IAppState {
  questions: Question[];
  status: string;
  index: number;
  answer: null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
