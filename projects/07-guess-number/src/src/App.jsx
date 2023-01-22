import { FiGithub } from 'react-icons/fi';
import { useState } from 'react';
import { getRandomNumber } from './utils/getRandomNumber.js';
import { toast, Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => (
  <>
    <div className='npp'>
      <div className='npp-app'>
        <GuessNumber />
        <Toaster position='bottom-center' />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>
);

export default App;


/**
 * @function GuessNumber
 * @return {JSX.Element}
 * @constructor
 */
const GuessNumber = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [setup, setSetup] = useState({
    secret: getRandomNumber(1, 10),
    attempts: 2,
  });

  console.log(`👋 The number that was guessed is ${setup.secret}`);

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
    const guess = Number(Object.fromEntries(new FormData(form).entries()).guess);

    // Validate
    if (guess < 0 || guess > 10 || guess === 0) {
      toast.error('Please enter a number from 1 to 10!');
      return;
    }

    if (guess === setup.secret) {
      toast((t) => (
        <div className='custom'>
          <p>You guessed it 🥳! The number you guessed - <span>{setup.secret}</span></p>
          <button onClick={() => location.reload()}>Play again?</button>
        </div>
      ), {
        duration: Infinity,
      });

      confetti({
        angle: getRandomNumber(55, 125),
        spread: getRandomNumber(50, 70),
        particleCount: getRandomNumber(50, 100),
        origin: { y: 0.6 },
      });

      form.remove();
    }

    if (guess !== setup.secret) {
      setSetup(prevState => ({ ...prevState, attempts: prevState.attempts - 1 }));

      if (setup.attempts === 0) {
        toast((t) => (
          <div className='custom error'>
            <p>You lost 🥲! The number you guessed - <span>{setup.secret}</span></p>
            <button onClick={() => location.reload()}>Play again?</button>
          </div>
        ), { duration: Infinity });

        form.remove();
      } else {
        toast.error(`Try again. Attempts left ${setup.attempts}`, { duration: 2000 });

        form.querySelector('input').disabled = true;

        setTimeout(() => {
          form.querySelector('input').disabled = false;
          form.querySelector('input').focus();
        }, 2000);

        form.reset();
      }
    }
  };

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <h1 className='title'>Guess Number</h1>
    <p>Guess the number is a game in which you have to guess the number given by the computer between 1 and 10. Use as
      few tries as possible. Good luck!</p>
    <form onSubmit={onSubmit}>
      <label>
        <input type='number' name='guess' min='1' max='10' placeholder='Enter the number' />
      </label>
    </form>
  </>;
};
