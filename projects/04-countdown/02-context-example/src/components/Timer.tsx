import { TIMER, TIMER_ACTION } from '../utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';


/**
 * Компонент таймера Countdown.
 * Этот компонент отображает обратный отсчет времени до указанной даты и предоставляет возможность сбросить отсчет.
 * @component
 */
const Timer = () => {
  const { date, showForm, endTimer, dispatch } = useAppContext();
  const parsedDate = useMemo(() => Date.parse(date), [date]);
  const [time, setTime] = useState(date - Date.now());

  useEffect(function() {
    const interval = setInterval(() => setTime(parsedDate - Date.now()), 1000);
    if (parsedDate - new Date().getTime() < 0) {
      clearInterval(interval);
      dispatch({ type: TIMER_ACTION.END_TIMER });
      dispatch({ type: TIMER_ACTION.SET_COUNTDOWN, payload: { title: 'Countdown Completed 🎊', date: null } });
    }
    return function() {
      return clearInterval(interval);
    };
  }, [parsedDate]);


  /**
   * Обработчик клика на кнопке "New Countdown", который выполняет сброс отсчета.
   */
  function handleClick(): void {
    dispatch({ type: TIMER_ACTION.RESET_COUNTDOWN });
    localStorage.clear();
  }


  /**
   * Функция для вычисления оставшегося времени в формате [метка времени, значение].
   * @returns {[string, string][]} Массив меток времени и их значений.
   */
  function calculateTime(): [string, string][] {
    return Object.entries({
      Days: `${Math.floor(time / TIMER.day)}`.padStart(2, '0'),
      Hours: `${Math.floor(time / TIMER.hour) % 24}`.padStart(2, '0'),
      Minutes: `${Math.floor(time / TIMER.minute) % 60}`.padStart(2, '0'),
      Seconds: `${Math.floor(time / TIMER.second) % 60}`.padStart(2, '0'),
    });
  }

  return (
    !showForm && (
      <div className='grid gap-3'>
        {!endTimer &&
          <ul className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {calculateTime().map(([label, value]) => (
              <li className='grid gap-1 place-items-center bg-neutral-900 rounded text-white p-2' key={label}>
                <p className='text-4xl font-bold'>{!isNaN(parseInt(value, 10)) ? value : null}</p>
                <span className='font-medium'>{label}</span>
              </li>
            ))}
          </ul>
        }
        <button className='btn bg-emerald-200 border-emerald-500 hover:bg-emerald-300' onClick={handleClick}>
          New Countdown
        </button>
      </div>
    )
  );
};

export default Timer;
