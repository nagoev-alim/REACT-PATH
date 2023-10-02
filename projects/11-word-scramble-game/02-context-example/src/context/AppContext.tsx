import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IAppContextProps } from '../types';
import mock from '../mock';
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
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [words] = useState<{ word: string; hint: string; }[]>(mock);

  const [word, setWord] = useState<string>(''); // Слово для отображения пользователю.
  const [hint, setHint] = useState<string>(''); // Подсказка к слову.
  const [correctWord, setCorrectWord] = useState<string | null>(null); // Правильное слово.
  const [timer, setTimer] = useState<number | null>(null); // Таймер.
  const [time, setTime] = useState<number>(30); // Оставшееся время.
  const [isWin, setIsWin] = useState(false); // Флаг, указывающий, выиграл ли пользователь игру.

  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(function() {
    initGame(); // Инициализация игры при монтировании компонента.
  }, []);

  useEffect(() => {
    if (time === 0) {
      // Если время вышло, выводим сообщение.
      toast.error(`Time off! ${correctWord?.toUpperCase()} was the correct word`);
      if (btnRef.current) btnRef.current.disabled = true; // Блокируем кнопку.
      clearInterval(timer!);
    } else if (timer !== null) {
      if (isWin) {
        return clearInterval(timer!); // Останавливаем таймер, если пользователь выиграл.
      }
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time, correctWord, timer]);

  /**
   * Функция для инициализации новой игры.
   */
  function initGame(): void {
    setTime(30);
    setIsWin(false);
    setTimer(time);
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    console.log(`👋Correct word : ` + word);
    let wordArray: string[] = word.split('');

    // Перемешиваем буквы в слове.
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    setWord(wordArray.join('')); // Устанавливаем перемешанное слово.
    setHint(hint); // Устанавливаем подсказку.
    setCorrectWord(word.toLowerCase()); // Устанавливаем правильное слово.
    if (inputRef.current) inputRef.current.value = ''; // Очищаем поле ввода.
    if (btnRef.current) btnRef.current.disabled = false; // Разблокируем кнопку.
  }

  /**
   * Функция для проверки введенного пользователем слова.
   */
  function checkWord(): void {
    let word = inputRef.current?.value.toLowerCase();
    if (!word) {
      toast.error('Please enter the word to check!');
      return;
    }
    if (word !== correctWord) {
      toast.error(`Oops! ${word.toUpperCase()} is not a correct word`);
      return;
    }
    if (word === correctWord) {
      toast.success(`Congrats! The correct word is: ${correctWord.toUpperCase()} `);
      setIsWin(true);
    }
  }
  return (
    <AppContext.Provider value={{word, hint, time, inputRef, initGame, btnRef, checkWord}}>
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
