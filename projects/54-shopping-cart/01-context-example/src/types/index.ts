import React from 'react';

export interface IAppState {
  products: {
    id: string;
    title: string;
    price: string;
    img: string;
    amount: number;
  }[],
  totalPrice: number,
  totalCount: number,
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}
