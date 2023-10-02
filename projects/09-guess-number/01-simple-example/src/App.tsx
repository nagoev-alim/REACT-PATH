import { FC, FormEvent, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getRandomNumber } from './utils/getRandomNumber';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "".
 */
const App: FC = () => {
  // Состояние пользователя
  const [user, setUser] = useState<string | null>(null);
  // Состояние для записи попыток и результатов
  const [guess, setGuess] = useState<{
    number: number,
    message: string,
    isGuessed: boolean
  }[]>([]);
  // Секретное число
  const [secret] = useState<number>(getRandomNumber(1, 100));
  // Ссылка на элемент ввода
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Вывод секретного числа в консоль
  console.log(`👋 The number that was guessed is ${secret}`);

  /**
   * Обработчик отправки формы.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const guess = parseInt(formData.get('guess') as string, 10);
    if (username) {
      if (username.trim().length === 0) {
        toast.error('Please enter your name.');
        return;
      } else {
        setUser(username);
        inputRef.current.setAttribute('min', '1');
        inputRef.current.setAttribute('max', '100');
      }
    }
    if (guess) {
      setGuess((v) => {
        let message: string = '';
        if (guess > secret) {
          message = '⬇️ Many. Try again 😸';
        } else if (guess < secret) {
          message = '⬆️️ Few. Try again 😸';
        } else {
          message = `🎊 Right. The number you've guessed: ${guess}`;
        }
        const isGuessed = guess === secret;
        if (isGuessed) form.remove();
        return [...v, { number: guess, message, isGuessed }];
      });
    }
    form.reset();
    inputRef.current.focus();
  };

  return (
    <div className='p-4 bg-neutral-700 text-yellow-400 min-h-screen'>
      <div className='grid gap-3 items-start '>
        <h1 className='text-2xl font-bold md:text-4xl'>🎲 Guess Number</h1>
        {user !== null && (
          <p>😄 <span className='font-bold'>{user}</span>, there is a number between 0 and 100. Try to guess it in the
            fewest number of tries. After
            each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
          </p>
        )}
        {guess.length !== 0 && (
          <ul className='grid gap-3'>{guess.map(({ number, message, isGuessed }, idx) =>
            <li className='grid gap-2' key={idx}>
              <p className='text-2xl font-medium'>➡️ {number}</p>
              <p>{message}</p>
              {isGuessed && <p>🎉 Number of attempts: <span className='font-bold'>{guess.length}</span></p>}
            </li>,
          )}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className='bg-transparent outline-none border-b-2 border-yellow-400 px-3 py-2.5 text-yellow-400 w-full'
            ref={inputRef}
            autoFocus
            name={`${!user ? 'username' : 'guess'}`}
            type={`${!user ? 'text' : 'number'}`} placeholder={`${!user ? '👋 Enter your name' : 'Enter number'}`}
          />
        </form>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
