import React from 'react';

export interface AppState {
  counter: number;
}

export interface AppContextProps {
  state?: AppState;
  dispatch: React.Dispatch<Action>;
  counter: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
  handleReset: () => void;
}

export interface Action {
  type: string;
  payload?: any;
}
