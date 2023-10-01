import { ChangeEvent, FC, useState } from 'react';

/**
 * Интерфейс состояния компонента.
 * @interface {object} State
 * @property {string} text - Текст в поле ввода.
 * @property {number} chars - Количество символов.
 * @property {number} words - Количество слов.
 * @property {number} spaces - Количество пробелов.
 * @property {number} letters - Количество букв.
 */
interface State {
  text: string;
  chars: number;
  words: number;
  spaces: number;
  letters: number;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Characters Counter".
 */
const App: FC = () => {
  const [state, setState] = useState<State>({
    text: '',
    chars: 0,
    words: 0,
    spaces: 0,
    letters: 0,
  });

  /**
   * Обработчик изменения текста в поле ввода.
   * @function
   * @param {ChangeEvent<HTMLTextAreaElement>} event - Событие изменения.
   */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target as HTMLTextAreaElement;
    const text = value;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    const spaces = text.split(' ').length - 1;
    const letters = chars - spaces;
    setState({ text, chars, words, spaces, letters });
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Characters Counter</h1>
      <textarea
        className='input input-area'
        placeholder='Enter some text below'
        onChange={handleChange}
        value={state.text}
      />
      <div className='grid grid-cols-4'>
        <Result label='Chars' value={state.chars} />
        <Result label='Words' value={state.words} />
        <Result label='Spaces' value={state.spaces} />
        <Result label='Letters' value={state.letters} />
      </div>
    </div>
  );
};

export default App;

/**
 * Интерфейс свойств компонента Result.
 * @interface {object} IResultProps
 * @property {string} label - Метка для результата.
 * @property {number} value - Значение результата.
 */
interface IResultProps {
  label: string,
  value: number
}

/**
 * Компонент Result представляет результат подсчета.
 * @function
 * @param {IResultProps} props - Свойства компонента Result.
 */
const Result: FC<IResultProps> = ({ label, value }) => {
  return (
    <p className='border flex justify-center items-center p-2 gap-1'>
      {label}: <span className='font-bold'>{value}</span>
    </p>
  );
};

