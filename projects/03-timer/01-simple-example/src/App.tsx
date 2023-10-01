import React, { JSX, useEffect, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { Form, Screen } from './components';
import { ITimer } from './types';

/**
 * Компонент для отображения и управления таймером.
 * @component
 */
const App: React.FC = () => {
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

  return (
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Timer</h1>
      {showForm && (
        <Form
          setTimer={setTimer}
          setShowForm={setShowForm}
        />
      )}
      {!showForm && (
        <Screen
          timer={timer}
          setTimer={setTimer}
          timerStart={timerStart}
          setTimerStart={setTimerStart}
          buttonIcon={buttonIcon}
          setShowForm={setShowForm}
        />
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
