import { FiGithub } from 'react-icons/fi';
import { useState } from 'react';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  return <>
    <div className='npp'>
      <div className='npp-app'>
        <StopWatch />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>;
}


/**
 * @component StopWatch
 * @return {JSX.Element}
 * @constructor
 */
const StopWatch = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [timer, setTimer] = useState({
    counter: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerStart, setTimerStart] = useState(false);
  const [timerInterval, setTimerInterval] = useState();

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onStart - Start timer
   */
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

  /**
   * @function onPause - Pause timer
   */
  const onPause = () => {
    setTimerStart(false);
    clearInterval(timerInterval);
  };

  /**
   * @function onReset - Reset timer
   */
  const onReset = () => {
    clearInterval(timerInterval);
    setTimerStart(false);
    setTimer({
      counter: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const formatTime = (n) => n < 10 ? `0${n}` : n;
  // =====================
  // 🚀 Render
  // =====================
  return <>
    <h1 className='title'>StopWatch</h1>
    <p className='time'>
      <span>{formatTime(timer.minutes)}</span>:<span>{formatTime(timer.seconds)}</span>
    </p>
    <div className='buttons'>
      <button className='button button--start' onClick={onStart}>Start</button>
      <button className='button button--pause' onClick={onPause}>Pause</button>
      <button className='button button--reset' onClick={onReset}>Reset</button>
    </div>
  </>;
};
