export const TIMER_ACTION = {
  TOGGLE_FORM: 'TOGGLE_FORM',
  SET_COUNTDOWN: 'SET_COUNTDOWN',
  END_TIMER: 'END_TIMER',
  RESET_COUNTDOWN: 'RESET_COUNTDOWN',
} as const;

export const TIMER = {
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
  second: 1000,
} as const;

