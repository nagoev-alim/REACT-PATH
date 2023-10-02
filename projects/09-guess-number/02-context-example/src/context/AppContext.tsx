import { createContext, FormEvent, useContext, useRef, useState } from 'react';
import { IAppContextProps } from '../types';
import { getRandomNumber } from '../utils/getRandomNumber.ts';
import { toast } from 'react-hot-toast';

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
  const [user, setUser] = useState<string | null>(null);
  const [guess, setGuess] = useState<{
    number: number,
    message: string,
    isGuessed: boolean
  }[]>([]);
  const [secret] = useState<number>(getRandomNumber(1, 100));
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(`👋 The number that was guessed is ${secret}`);

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
    <AppContext.Provider value={{ user, guess, inputRef, handleSubmit }}>
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
