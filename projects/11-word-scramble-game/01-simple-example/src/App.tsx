import { FC, useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import mock from './mock';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Word Scramble Game".
 */
const App: FC = () => {
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
    <div className='bg-white border shadow rounded max-w-md w-full p-3 grid gap-4'>
      <h1 className='text-center font-bold text-2xl md:text-4xl'>Word Scramble Game</h1>
      <div className='grid gap-3'>
        <p className='font-bold text-2xl uppercase tracking-widest text-center'>{word}</p>
        <div className='grid gap-3'>
          <p className='font-medium'>
            Hint: <span className='bg-gray-200 p-1 rounded font-normal'>{hint}</span>
          </p>
          <p className='font-medium'>
            Time Left: <span className='bg-gray-200 p-1 rounded font-normal'>{`${time}s`}</span>
          </p>
        </div>
        <input ref={inputRef} className='input' type='text' spellCheck='false' placeholder='Enter a valid word' />
        <div className='grid grid-cols-2 gap-2'>
          <button className='btn' onClick={initGame}>Refresh Word</button>
          <button ref={btnRef} className='btn disabled:bg-gray-200 disabled:text-gray-300' onClick={checkWord}>Check
            Word
          </button>
        </div>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
