import React, { createContext, JSX, useContext, useEffect, useState } from 'react';
import { IAppContextProps, ITimer } from '../types';
import { FiPause, FiPlay } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [showForm, setShowForm] = useState<boolean>(true);
  /**
   * Состояние таймера.
   * @type {ITimer}
   */
  const [timer, setTimer] = useState<ITimer>({ minutes: 0, seconds: 0, timeLeft: 0 });
  /**
   * Иконка кнопки "Пуск/Пауза".
   * @type {JSX.Element}
   */
  const [buttonIcon, setButtonIcon] = useState<JSX.Element>(<FiPlay size={25} />);
  /**
   * Состояние таймера (запущен/приостановлен).
   * @type {boolean}
   */
  const [timerStart, setTimerStart] = useState<boolean>(false);

  useEffect(() => {
    setButtonIcon(!timerStart ? <FiPlay size={25} /> : <FiPause size={25} />);
    /**
     * Функция обработки счетчика времени и обновления состояния таймера.
     */
    const interval = setInterval(() => {
      timerStart && setTimer(v => {
        const timeLeft = v.timeLeft >= 1 ? v.timeLeft - 1 : 0;
        return {
          timeLeft,
          minutes: Math.floor(timeLeft / 60).toString().padStart(2, '0'),
          seconds: (timeLeft % 60).toString().padStart(2, '0'),
        };
      });
    }, 1000);
    if (timer.timeLeft === 0) setTimerStart(false);
    return () => clearInterval(interval);
  }, [timer, timerStart]);


  /**
   * Обработчик запуска таймера.
   */
  function handleStart(): void {
    if (timer.timeLeft === 0) setTimer(v => ({ ...v, timeLeft: 0 }));
    setTimerStart(true);
  }


  /**
   * Обработчик сброса таймера.
   */
  function handleReset(): void {
    setTimerStart(false);
    setShowForm(true);
    setTimer({ minutes: 0, seconds: 0, timeLeft: 0 });
  }


  /**
   * Обработчик нажатия на кнопку (запуск/остановка таймера).
   */
  function handleClick(): void {
    return !timerStart ? handleStart() : setTimerStart(false);
  }


  /**
   * Обработчик отправки формы с введенным временем.
   * @param {React.FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const time = parseInt(formData.get('time') as string, 10);
    if (!time || time === 0) {
      toast.error('Please set a number.');
      return;
    }
    if (time < 60) {
      setTimer(() => {
        return ({
          timeLeft: time * 60,
          minutes: Math.floor(time * 60 / 60).toString().padStart(2, '0'),
          seconds: (time * 60 % 60).toString().padStart(2, '0'),
        });
      });
    }
    setShowForm(false);
    form.reset();
  }

  return (
    <AppContext.Provider value={{ buttonIcon, showForm, timer, handleSubmit, handleStart, handleReset, handleClick }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
