import React from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  modalOpen: boolean;
  toggleModal: () => void;
}

export interface Action {
  type: string;
  payload?: any;
}
