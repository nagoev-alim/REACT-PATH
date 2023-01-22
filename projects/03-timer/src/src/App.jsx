import { FiGithub, FiPause, FiPlay } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => (
  <>
    <div className='npp'>
      <div className='npp-app'>
        <Timer />
        <Toaster
          position='bottom-center'
        />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>
);

export default App;


/**
 * @component Timer
 * @return {JSX.Element}
 * @constructor
 */
const Timer = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [showForm, setShowForm] = useState(true);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    timeLeft: 0,
  });
  const [buttonIcon, setButtonIcon] = useState(<FiPlay size={25} />);
  const [timerStart, setTimerStart] = useState(false);

  useEffect(() => {
    setButtonIcon(!timerStart ? <FiPlay size={25} /> : <FiPause size={25} />);

    const interval = setInterval(() => {
      timerStart && setTimer(prevState => {
        const timeLeft = prevState.timeLeft >= 1 ? prevState.timeLeft - 1 : 0;
        return {
          timeLeft,
          minutes: Math.floor(timeLeft / 60).toString().padStart(2, '0'),
          seconds: (timeLeft % 60).toString().padStart(2, '0'),
        };
      });
    }, 1000);

    // Toggle timer
    if (timer.timeLeft === 0) setTimerStart(false)

    return () => {
      clearInterval(interval);
    };
  }, [timer, timerStart]);


  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let time = Object.fromEntries(new FormData(form).entries()).time.trim();
    time = Number(time);

    // Validate
    if (time === 0) {
      toast.error('Please set a number.');
      return;
    }

    if (time < 60) {
      setTimer(() => {
        const timeLeft = time * 60;
        return {
          timeLeft,
          minutes: Math.floor(timeLeft / 60).toString().padStart(2, '0'),
          seconds: (timeLeft % 60).toString().padStart(2, '0'),
        };
      });
    }

    setShowForm(false);
    form.reset();
  };

  /**
   * @function start - Start timer
   */
  const start = () => {
    if (timer.timeLeft === 0) setTimer(prevState => ({
      ...prevState,
      timeLeft: 0,
    }));
    setTimerStart(true);
  };

  /**
   * @function pause - Pause timer
   */
  const pause = () => setTimerStart(false);

  /**
   * @function onToggle - Toggle start/pause
   */
  const onToggle = () => !timerStart ? start() : pause();

  /**
   * @function onReset - Reset timer
   */
  const onReset = () => {
    setTimerStart(false);
    setShowForm(true);
    setTimer({
      minutes: 0,
      seconds: 0,
      timeLeft: 0,
    });
  };

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <h1 className='title'>Timer</h1>
    {showForm ? (
      <form className='form' onSubmit={onSubmit}>
        <label>
          <input type='number' name='time' step='1' min='1' max='60'
                 placeholder='Enter number of minutes (maximum - 60):' />
        </label>
      </form>
    ) : (
      <>
        <div className='time'>
          <span>{timer.minutes}</span>
          <span>:</span>
          <span>{timer.seconds}</span>
        </div>
        <button onClick={onToggle}>{buttonIcon}</button>
        <button onClick={onReset}>Reset Timer</button>
      </>
    )}
  </>;
};
