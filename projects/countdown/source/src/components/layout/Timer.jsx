import { useEffect, useMemo, useState } from 'react';
import { useAppHook } from '../../context/AppContext.jsx';
import { CONSTANTS } from '../../context/constant.js';

const Timer = () => {
  const { dispatch, date, endTimer, showForm } = useAppHook();
  const parsedDate = useMemo(() => Date.parse(date), [date]);
  const [time, setTime] = useState(date - Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(parsedDate - Date.now()), 1000);

    if (parsedDate - new Date().getTime() < 0) {
      clearInterval(interval);
      dispatch({ type: CONSTANTS.END_TIMER });
      dispatch({
        type: CONSTANTS.SET_COUNTDOWN,
        payload: { title: 'Countdown Completed 🎊', date: null },
      });
    }

    return () => {
      clearInterval(interval)
    }
  }, [parsedDate]);

  return !showForm
    ? <div className='countdown__display'>
      {!endTimer &&
        <ul className='countdown__list'>
          {Object.entries({
            Days: `${Math.floor(time / CONSTANTS.VALUES.day)}`.padStart(2, '0'),
            Hours: `${Math.floor(time / CONSTANTS.VALUES.hour) % 24}`.padStart(2, '0'),
            Minutes: `${Math.floor(time / CONSTANTS.VALUES.minute) % 60}`.padStart(2, '0'),
            Seconds: `${Math.floor(time / CONSTANTS.VALUES.second) % 60}`.padStart(2, '0'),
          })
            .map(([label , value]) => (
              <li key={label}>
                <p>{!isNaN(value) ? value : null}</p>
                <span>{label}</span>
              </li>
            ))}
        </ul>
      }

      <button
        className='button button--green button--fluid'
        onClick={() => {
          dispatch({ type: CONSTANTS.RESET_COUNTDOWN });
          localStorage.clear()
        }}
      >New Countdown
      </button>
    </div> : null;
};

export default Timer;
