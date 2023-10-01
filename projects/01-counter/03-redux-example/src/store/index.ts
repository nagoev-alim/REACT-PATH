import { configureStore } from '@reduxjs/toolkit';
import { counterReducer as counter } from '../features/counter/counterSlice';

/**
 * Конфигурация Redux-хранилища.
 */
export const store = configureStore({
  reducer: {
    counter,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({});
  },
});

/**
 * Тип для состояния всего приложения.
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * Тип для диспетчера Redux-экшенов.
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch
