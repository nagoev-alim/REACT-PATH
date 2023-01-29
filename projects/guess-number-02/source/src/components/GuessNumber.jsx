import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getRandomNumber } from '../utils/getRandomNumber.js';

const GuessNumber = () => {
  const [user, setUser] = useState(null);
  const [guess, setGuess] = useState([]);
  const [secret] = useState(getRandomNumber(1, 100));
  const inputRef = useRef();

  console.log(`👋 The number that was guessed is ${secret}`);

  // 🚀 METHODS: ===============================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { username, guess } = Object.fromEntries(new FormData(form).entries());

    // Check username
    if (username) {
      if (username.trim().length === 0) {
        toast.error('Please enter your name.');
        return;
      } else {
        setUser(username);
        inputRef.current.setAttribute('min', 1);
        inputRef.current.setAttribute('max', 100);
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
    inputRef.current.focus();
  };

  // 🚀 RENDER: ================================
  return <div className='game'>
    <h1 className='title game__title'>🎲 Guess Number</h1>
    {user !== null &&
      <p>😄 {user}, there is a number between 0 and 100. Try to guess it in the fewest number of tries. After
        each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
      </p>
    }

    {guess.length !== 0 &&
      <ul>{guess.map(({ number, message, isGuessed }, idx) =>
        <li key={idx}>
          <p>{number}</p>
          <p>{message}</p>
          {isGuessed && <p>🎉 Number of attempts: {guess.length}</p>}
        </li>,
      )}
      </ul>}

    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        autoFocus
        name={`${!user ? 'username' : 'guess'}`}
        type={`${!user ? 'text' : 'number'}`} placeholder={`${!user ? '👋 Enter your name' : 'Enter number'}`}
      />
    </form>

  </div>;
};

export default GuessNumber;
