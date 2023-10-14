import { useAppContext } from '../context/AppContext.tsx';
import { useEffect } from 'react';

/**
 * React-компонент таймера.
 * @function
 * @name Timer
 * @description Отображает таймер, отсчитывающий время в минутах и секундах.
 */
const Timer = () => {
  const { secondsRemaining, dispatch } = useAppContext();
  const mins: number = Math.floor(secondsRemaining / 60);
  const seconds: number = secondsRemaining % 60;
  /**
   * Использует `useEffect` для установки интервала обновления таймера каждую секунду.
   */
  useEffect(function() {
    const interval = setInterval(function() {
      dispatch({ type: 'time' });
    }, 1000);
    /**
     * Очищает интервал при размонтировании компонента.
     */
    return function() {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;