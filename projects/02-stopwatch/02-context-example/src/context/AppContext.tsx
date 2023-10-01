import React, { createContext, useContext, useState } from 'react';
import { AppContextProps, Timer } from '../types';

// Создаем контекст приложения
const AppContext = createContext<AppContextProps | null>(null);

/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, к которым будет доступен контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Состояние секундомера
  const [timer, setTimer] = useState<Timer>({ counter: 0, minutes: 0, seconds: 0 });
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<number | undefined>();

  /**
   * Обработчик запуска секундомера.
   */
  function handleStart(): void {
    if (!timerStart) {
      setTimerInterval(setInterval(() => {
        setTimer(prev => ({
          counter: prev.counter + 1,
          minutes: Math.floor(prev.counter / 60),
          seconds: prev.counter % 60,
        }));
      }, 1000));
      setTimerStart(true);
    }
  }

  /**
   * Обработчик приостановки секундомера.
   */
  function handlePause(): void {
    setTimerStart(false);
    clearInterval(timerInterval);
  }

  /**
   * Обработчик сброса секундомера.
   */
  function handleReset(): void {
    clearInterval(timerInterval);
    setTimerStart(false);
    setTimer({
      counter: 0,
      minutes: 0,
      seconds: 0,
    });
  }

  return (
    <AppContext.Provider value={{ timer, handleStart, handlePause, handleReset }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для получения контекста приложения.
 * @function
 * @returns {AppContextProps} Объект контекста с состоянием секундомера и его функциями управления.
 * @throws {Error} Ошибка, если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
