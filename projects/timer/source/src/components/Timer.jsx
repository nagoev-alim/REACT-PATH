import { useEffect, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Timer = () => {
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

    if (timer.timeLeft === 0) setTimerStart(false);

    return () => clearInterval(interval);
  }, [timer, timerStart]);

  // 🚀 METHODS: ================================

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let time = Number(Object.fromEntries(new FormData(form).entries()).time.trim());
    if (time === 0) {
      toast.error('Please set a number.');
      return;
    }
    if (time < 60) {
      setTimer(() => ({
        timeLeft: time * 60,
        minutes: Math.floor(time * 60 / 60).toString().padStart(2, '0'),
        seconds: (time * 60 % 60).toString().padStart(2, '0'),
      }));
    }
    setShowForm(false);
    form.reset();
  };

  const start = () => {
    if (timer.timeLeft === 0) {
      setTimer(prev => ({
        ...prev,
        timeLeft: 0,
      }));
    }
    setTimerStart(true);
  };

  const onReset = () => {
    setTimerStart(false);
    setShowForm(true);
    setTimer({
      minutes: 0,
      seconds: 0,
      timeLeft: 0,
    });
  };

  // 🚀 RENDER: ================================
  return <div className='timer'>
    <h1 className='title timer__title'>Timer</h1>

    {showForm &&
      <form className='timer__form' onSubmit={onSubmit}>
        <input type='number' name='time' step='1' min='1' max='60'
               placeholder='Enter number of minutes (maximum - 60):' />
        <button className='button button--green button--fluid' type='submit'>Start</button>
      </form>
    }

    {!showForm &&
      <>
        <div className='timer__value'>
          <span>{timer.minutes}</span>:
          <span>{timer.seconds}</span>
        </div>
        <button
          className='button button--fluid'
          onClick={() => !timerStart ? start() : setTimerStart(false)}
        >
          {buttonIcon}
        </button>
        <button className='button button--red button--fluid' onClick={onReset}>Reset Timer</button>
      </>
    }
  </div>;
};

export default Timer;
