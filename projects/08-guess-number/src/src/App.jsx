import { FiGithub } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getRandomNumber } from './utils/getRandomNumber.js';
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
  const [user, setUser] = useState(null);
  const [guess, setGuess] = useState([]);
  const [secret, setSecret] = useState(getRandomNumber(1, 100));

  console.log(`👋 The number that was guessed is ${secret}`);

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
    const input = form.querySelector('input');
    const { username, guess } = Object.fromEntries(new FormData(form).entries());

    // Check username
    if (username) {
      if (username.trim().length === 0) {
        toast.error('Please enter your name.');
        return;
      } else {
        setUser(username);
      }
    }

    // Check guess
    if (guess) {
      setGuess(prevState => {
        const number = Number(guess);
        const message = number > secret ? '⬇️ Many. Try again 😸' : number < secret ? '⬆️️ Few. Try again 😸' : `🎊 Right. The number you've guessed: ${guess}`;
        const isGuessed = number === secret;

        if (isGuessed) {
          form.remove();
        }

        return [...prevState, {
          number,
          message,
          isGuessed,
        }];
      });
    }

    // Reset form
    form.reset();
    input.focus();
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='guess-number'>
    <h1 className='title'>🎲 Guess Number</h1>

    {user !== null &&
      <p>😄 {user}, there is a number between 0 and 100. Try to guess it in the fewest number of tries. After
        each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
      </p>
    }

    {guess.length !== 0 &&
      <ul>{guess.map(({ number, message, isGuessed }, idx) =>
        <li key={idx}>
          <p>{message}</p>
          <p>{!isGuessed ? number : `🎉 Number of attempts: ${guess.length}`}</p>
        </li>,
      )}
      </ul>}

    <form onSubmit={onSubmit}>
      <label>
        {user === null && <input autoFocus name='username' type='text' placeholder='👋 Enter your name' />}
        {user !== null && <input autoFocus name='guess' type='number' min='1' max='100' placeholder='0' />}
      </label>
    </form>
  </div>;
};

