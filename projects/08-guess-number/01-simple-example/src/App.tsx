import { FC, FormEvent, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getRandomNumber } from './utils/getRandomNumber';
import confetti from 'canvas-confetti';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Guess Number".
 */
const App: FC = () => {
  // Состояние игры
  const [game, setGame] = useState<{
    secret: number;
    attempts: number;
  }>({
    secret: getRandomNumber(1, 10),
    attempts: 2,
  });
  // Ссылка на элемент ввода числа
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(`👋 The number that was guessed is ${game.secret}`);

  /**
   * Обработчик отправки формы.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const guess = parseInt(formData.get('guess') as string, 10);
    if (guess < 0 || guess > 10 || guess === 0) {
      toast.error('Please enter a number from 1 to 10!');
      return;
    }
    if (guess === game.secret) {
      toast(() => (
        <div className='grid gap-3'>
          <p className='font-medium text-center'>You guessed it 🥳<br /> The number you guessed - <span
            className='font-bold'>{game.secret}</span></p>
          <button className='btn border-green-400 bg-green-300 hover:bg-green-400'
                  onClick={() => location.reload()}>Play again?
          </button>
        </div>
      ), { duration: Infinity });
      // Запуск конфетти
      confetti({
        angle: getRandomNumber(55, 125),
        spread: getRandomNumber(50, 70),
        particleCount: getRandomNumber(50, 100),
        origin: { y: 0.6 },
      });
      form.remove();
    }
    if (guess !== game.secret) {
      setGame(v => ({ ...v, attempts: v.attempts - 1 }));
      if (game.attempts === 0) {
        toast(() => (
          <div className='grid gap-3'>
            <p className='font-medium text-center'>You lost 🥲! <br /> The number you guessed - <span
              className='font-bold'>{game.secret}</span></p>
            <button className='btn border-red-400 bg-red-300 hover:bg-red-400' onClick={() => location.reload()}>Play
              again?
            </button>
          </div>
        ), { duration: Infinity });

        form.remove();
      } else {
        toast.error(`Try again. Attempts left ${game.attempts}`, { duration: 2000 });
        if (inputRef.current) {
          inputRef.current.disabled = true;
        }
        setTimeout(function() {
          if (inputRef.current) {
            inputRef.current.disabled = false;
            inputRef.current.focus();
          }
        }, 2000);
        form.reset();
      }
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Guess Number</h1>
      <p>Guess the number is a game in which you have to guess the number given by the computer between 0 and 10. Use as
        few tries as possible. Good luck!</p>
      <form onSubmit={handleSubmit}>
        <label aria-label='Enter the number'>
          <input
            className='input'
            type='number'
            name='guess'
            placeholder='Enter the number'
            min='1'
            max='10'
            ref={inputRef}
          />
        </label>
      </form>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
