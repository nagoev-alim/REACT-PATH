import React, { ChangeEvent } from 'react';

export interface IAppState {
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch?: React.Dispatch<Action>;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSetAlarm: () => void;
  label: string;
  btnLabel: string;
  formData: {
    hours: string,
    minutes: string,
    ampm: string,
  };
  imgRef: HTMLImageElement | null;
  bodyRef: HTMLDivElement | null;
}

export interface Action {
  type: string;
  payload?: any;
}
