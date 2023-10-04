import React, { FormEvent } from 'react';

export interface Transaction {
  id: string;
  text: string;
  amount: number;
}

export interface IAppState {
  transactions: Transaction[] | [],
  balance: number;
  income: number;
  expense: number;
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleDelete: (itemId: string) => void;
}

export interface Action {
  type: string;
  payload?: any;
}
