import { useState } from 'react';

const StopWatch = () => {
  const [timer, setTimer] = useState({
    counter: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerStart, setTimerStart] = useState(false);
  const [timerInterval, setTimerInterval] = useState();

  // 🚀 METHODS: ================================
  const onStart = () => {
    if (!timerStart) {
      setTimerInterval(setInterval(() => setTimer(({ counter }) => ({
        counter: counter + 1,
        minutes: Math.floor(counter / 60),
        seconds: counter % 60,
      })), 1000));
      setTimerStart(true);
    }
  };

  const onPause = () => {
    setTimerStart(false);
    clearInterval(timerInterval);
  };

  const onReset = () => {
    clearInterval(timerInterval);
    setTimerStart(false);
    setTimer({
      counter: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  // 🚀 RENDER: ================================
  return <div className='stop-watch'>
    <h1 className='title stop-watch__title'>StopWatch</h1>
    <p className='stop-watch__value'>
      <span>{`${timer.minutes}`.padStart(2, '0')}</span>:
      <span>{`${timer.seconds}`.padStart(2, '0')}</span>
    </p>
    <button className='button button--start' onClick={onStart}>Start</button>
    <button className='button button--pause' onClick={onPause}>Pause</button>
    <button className='button button--reset' onClick={onReset}>Reset</button>
  </div>;
};

export default StopWatch;
