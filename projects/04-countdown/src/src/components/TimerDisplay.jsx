import { useEffect, useMemo, useState } from 'react';

/**
 * @function TimerDisplay
 * @param targetDate
 * @param timer
 * @param setShowForm
 * @param setTimer
 * @return {JSX.Element}
 * @constructor
 */
const TimerDisplay = ({ targetDate = new Date().toString(), setShowForm, setTimer }) => {
  // =====================
  // 🚀 Hooks
  // =====================
  const parsedDate = useMemo(() => Date.parse(targetDate), [targetDate]);
  const [time, setTime] = useState(parsedDate - Date.now());
  const [timerEnd, setTimerEnd] = useState(false);
  const [calculate, setCalculate] = useState({
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
  });

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDate - Date.now()),
      1000,
    );

    if (parsedDate - new Date().getTime() < 0) {
      clearInterval(interval);
      setTimerEnd(true);
      setTimer(prevState => ({
        ...prevState,
        title: 'Countdown Complete 🎊',
      }));
    }

    return () => clearInterval(interval);
  }, [parsedDate]);

  // =====================
  // 🚀 Methods
  // =====================
  const onReset = () => {
    setTimer(null);
    setShowForm(true);
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='countdown'>
    {!timerEnd &&
      <ul>
        {Object.entries({
          Days: time / calculate.day,
          Hours: (time / calculate.hour) % 24,
          Minutes: (time / calculate.minute) % 60,
          Seconds: (time / calculate.second) % 60,
        }).map(([label, value]) => (
          <li key={label}>
            <p>{`${Math.floor(value)}`.padStart(2, '0')}</p>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    }

    <button onClick={onReset}>New Countdown</button>
  </div>;
};

export default TimerDisplay;
