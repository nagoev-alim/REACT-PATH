export const TYPES = {
  dataReceived: 'dataReceived',
  dataFailed: 'dataFailed',
  start: 'start',
  newAnswer: 'newAnswer',
  nextQuestion: 'nextQuestion',
  finish: 'finish',
  restart: 'restart',
  time: 'time',
} as const;

export const APP_STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED',
} as const;
export const SECS_PER_QUESTION: number = 30;