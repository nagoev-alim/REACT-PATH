import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../../types';

const initialState: CounterState = {
  counter: 0,
};

/**
 * Slice для управления состоянием счетчика.
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**
     * Экшен для сброса состояния счетчика.
     */
    reset: () => initialState,

    /**
     * Экшен для увеличения счетчика на 1.
     */
    increment: (state) => {
      state.counter += 1;
    },

    /**
     * Экшен для уменьшения счетчика на 1.
     */
    decrement: (state) => {
      state.counter -= 1;
    },

    /**
     * Экшен для увеличения счетчика на указанное количество.
     * @param {PayloadAction<number>} action - Экшен с полезной нагрузкой (число).
     */
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },

    /**
     * Экшен для уменьшения счетчика на указанное количество.
     * @param {PayloadAction<number>} action - Экшен с полезной нагрузкой (число).
     */
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
  },
});

/**
 * Экшены для управления счетчиком.
 */
export const { reset, increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;

/**
 * Редуктор счетчика.
 */
export const counterReducer = counterSlice.reducer;
/**
 * Селектор для получения состояния счетчика из Redux-хранилища.
 * @function
 * @param {Object} state - Состояние Redux.
 * @returns {CounterState} Состояние счетчика.
 */
export const counterSelector = (state: { counter: CounterState }): CounterState => state.counter;

