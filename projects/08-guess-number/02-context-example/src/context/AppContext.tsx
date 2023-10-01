import { createContext, FormEvent, useContext, useRef, useState } from 'react';
import { IAppContextProps } from '../types';
import { getRandomNumber } from '../utils/getRandomNumber.ts';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [game, setGame] = useState<{
    secret: number;
    attempts: number;
  }>({
    secret: getRandomNumber(1, 10),
    attempts: 2,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Вывод секретного числа в консоль
  console.log(`👋 The number that was guessed is ${game.secret}`);

  /**
   * Обработчик отправки формы ввода числа.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const guess = parseInt(formData.get('guess') as string, 10);
    if (!isNaN(guess) || guess < 0 || guess > 10 || guess === 0) {
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
    <AppContext.Provider value={{ inputRef, handleSubmit }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
