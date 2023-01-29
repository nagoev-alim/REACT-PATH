import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import confetti from 'canvas-confetti';

const GuessNumber = () => {
  const [setup, setSetup] = useState({
    secret: getRandomNumber(1, 10),
    attempts: 2,
  });
  const inputRef = useRef();

  console.log(`👋 The number that was guessed is ${setup.secret}`);

  // 🚀 METHODS: ===============================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const guess = Number(Object.fromEntries(new FormData(form).entries()).guess);

    if (guess < 0 || guess > 10 || guess === 0) {
      toast.error('Please enter a number from 1 to 10!');
      return;
    }

    if (guess === setup.secret) {
      // Show Message
      toast((t) => (
        <div className='toast toast--success'>
          <p>You guessed it 🥳! The number you guessed - <span>{setup.secret}</span></p>
          <button className='button button--fluid button--green' onClick={() => location.reload()}>Play again?</button>
        </div>
      ), { duration: Infinity });

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
        // Show Message
        toast((t) => (
          <div className='toast toast--error'>
            <p>You lost 🥲! The number you guessed - <span>{setup.secret}</span></p>
            <button className='button button--fluid button--red' onClick={() => location.reload()}>Play again?
            </button>
          </div>
        ), { duration: Infinity });

        form.remove();
      } else {
        toast.error(`Try again. Attempts left ${setup.attempts}`, { duration: 2000 });
        inputRef.current.disabled = true;
        setTimeout(() => {
          inputRef.current.disabled = false;
          inputRef.current.focus();
        }, 2000);
        form.reset();
      }
    }
  };

  // 🚀 RENDER: ================================
  return <div className='game'>
    <h1 className='title game__title'>Guess Number</h1>
    <p>Guess the number is a game in which you have to guess the number given by the computer between 1 and 10. Use as
      few tries as possible. Good luck!</p>
    <form onSubmit={onSubmit}>
      <input ref={inputRef} type='number' name='guess' min='1' max='10' placeholder='Enter the number' />
    </form>
  </div>;
};

export default GuessNumber;
