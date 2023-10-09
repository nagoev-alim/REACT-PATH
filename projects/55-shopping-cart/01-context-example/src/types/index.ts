import React from 'react';

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  rating: { rate: number, count: number };
  title: string;
}

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleCartOpen: () => void;
  cartProductDetail: { price: number, amount: number };
  products: Product[] | [];
  cartProducts: Product[] | [];
  toggleCart: boolean;
  isLoading: boolean;
  isError: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}
