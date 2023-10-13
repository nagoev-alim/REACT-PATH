import React from 'react';

interface Stories {
  author: string;
  comment_text: string | null;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  parent_id: null;
  points: number;
  relevancy_score: number;
  story_id: null;
  story_text: string | null;
  story_title: string | null;
  story_url: string | null;
  title: string;
  url: string;
}

export interface IAppState {
  isLoading: boolean;
  hits: Stories[];
  query: string;
  page: number;
  nbPages: number;
}

export interface IAppContextProps extends IAppState {
  state?: IAppState;
  dispatch: React.Dispatch<Action>;
  removeStory: (payload: string) => void;
  searchStory: (payload: string) => void;
  handlePage: (payload: string) => void;
}

export interface Action {
  type: string;
  payload?: any;
}
