import React, { useState } from 'react';

/**
 * @interface {Object} Timer
 * @property {number} counter - Общее количество секунд
 * @property {number} minutes - Количество минут
 * @property {number} seconds - Количество секунд
 */
interface Timer {
  counter: number;
  minutes: number;
  seconds: number;
}

/**
 * Компонент для отображения и управления секундомером.
 * @component
 */
const App: React.FC = () => {
  const [timer, setTimer] = useState<Timer>({
    counter: 0,
    minutes: 0,
    seconds: 0,
  });
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
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3 place-content-center'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>StopWatch</h1>
      <p className='flex gap-1 justify-center font-bold text-7xl'>
        <span>{`${timer.minutes}`.padStart(2, '0')}</span>:
        <span>{`${timer.seconds}`.padStart(2, '0')}</span>
      </p>
      <div className='grid sm:grid-cols-3 gap-2'>
        {[
          { label: 'Start', className: 'bg-green-400 hover:bg-green-500', fn: handleStart },
          { label: 'Pause', className: 'bg-neutral-400 hover:bg-neutral-500', fn: handlePause },
          { label: 'Reset', className: 'bg-red-400 hover:bg-red-500', fn: handleReset },
        ].map((item) => (
          <button key={item.label} className={`btn text-white font-medium ${item.className}`} onClick={item.fn}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
