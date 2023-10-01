import React, { JSX } from 'react';
import { ITimer } from '../types';

/**
 * @interface
 * Свойства компонента Screen.
 */
interface IScreenProps {
  /**
   * Текущие значения таймера.
   * @type {ITimer}
   */
  timer: ITimer,

  /**
   * Функция установки значений таймера.
   * @param {ITimer} value - Объект с данными таймера.
   */
  setTimer: (value: ITimer) => void,

  /**
   * Флаг, указывающий, запущен ли таймер.
   * @type {boolean}
   */
  timerStart: boolean,

  /**
   * Функция для управления запуском/остановкой таймера.
   * @param {boolean} value - Значение, указывающее на запуск или остановку таймера.
   */
  setTimerStart: (value: boolean) => void,

  /**
   * Элемент кнопки для управления таймером (Play/Pause).
   * @type {JSX.Element}
   */
  buttonIcon: JSX.Element,

  /**
   * Функция для управления видимостью формы ввода времени.
   * @param {boolean} value - Флаг видимости формы.
   */
  setShowForm: (value: boolean) => void
}

/**
 * @component
 * Компонент для отображения и управления таймером.
 */
const Screen: React.FC<IScreenProps> = ({ timer, setTimer, timerStart, setTimerStart, buttonIcon, setShowForm }) => {
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

  return (
    <div className='grid place-items-center gap-3'>
      <div className='flex justify-center items-center text-6xl font-bold'>
        <span>{timer.minutes}</span>:<span>{timer.seconds}</span>
      </div>
      <button className='btn' onClick={handleClick}>{buttonIcon}</button>
      <button className='btn w-full font-bold text-white bg-red-500 hover:bg-red-400' onClick={handleReset}>
        Reset Timer
      </button>
    </div>
  );
};

export default Screen;
