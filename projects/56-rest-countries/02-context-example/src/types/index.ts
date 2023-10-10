import React from 'react';

export interface CountryItem {
  capital: string;
  flags: {
    svg: string;
    png: string;
  };
  independent: boolean;
  name: string;
  population: number;
  region: string;
}

export interface Country {
  name: string;
  nativeName: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  borders: string[];
}

export interface IAppState {
  countries: CountryItem[] | [];
  filtered: CountryItem[] | [];
  country: Country | null;
  isLoading: boolean;
  isError: boolean;
  theme: string;
  countryBorders: string[];
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
  handleFilter: (query: string, region: string) => void;
  fetchCountry: (name: string) => Promise<void>;
  handleThemeToggle: () => void;
}

export interface Action {
  type: string;
  payload?: any;
}
