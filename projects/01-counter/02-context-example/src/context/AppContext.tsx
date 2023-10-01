import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './AppReducer';
import { AppContextProps, AppState } from '../types';
import { COUNTER_ACTIONS } from '../utils/constants';

// Создаем контекст для приложения
const AppContext = createContext<AppContextProps | null>(null);

// Начальное состояние счетчика
const initialState: AppState = { counter: 0 };

/**
 * Компонент-поставщик контекста для приложения.
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы.
 * @returns {JSX.Element} Компонент-поставщик контекста.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Используем хук useReducer для управления состоянием
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Обработчик уменьшения значения счетчика.
   */
  function handleDecrease() {
    dispatch({ type: COUNTER_ACTIONS.DECREASE });
  }

  /**
   * Обработчик увеличения значения счетчика.
   */
  function handleIncrease() {
    dispatch({ type: COUNTER_ACTIONS.INCREASE });
  }

  /**
   * Обработчик сброса значения счетчика.
   */
  function handleReset() {
    dispatch({ type: COUNTER_ACTIONS.RESET });
  }

  // Возвращаем провайдер контекста со значением и обработчиками
  return (
    <AppContext.Provider value={{ ...state, dispatch, handleDecrease, handleIncrease, handleReset }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {AppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
