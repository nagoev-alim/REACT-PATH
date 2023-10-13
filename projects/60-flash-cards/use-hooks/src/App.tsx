import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import mock from './mock';

/**
 * Интерфейс для представления карточки.
 * @interface
 */
interface Card {
  id: number;       // Уникальный идентификатор карточки.
  question: string; // Текст вопроса.
  answer: string;   // Текст ответа.
}

interface Card {
  id: number;
  question: string;
  answer: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние, хранящее идентификатор выбранной карточки или `null`, если ни одна карточка не выбрана.
   * @type {number | null}
   */
  const [selectedId, setSelectedId] = useState<number | null>(null);

  /**
   * Функция обработки щелчка по карточке.
   * @function
   * @name handleClick
   * @param {number} id - Идентификатор карточки, по которой был выполнен щелчок.
   */
  function handleClick(id: number) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <div className='max-w-5xl w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Flash Cards</h1>
      <ul className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {mock.map((question: Card) => (
          <li
            key={question.id}
            onClick={() => handleClick(question.id)}
            className={`cursor-pointer p-3 border-2 rounded bg-white flex justify-center items-center text-center ${question.id === selectedId ? 'bg-green-50' : ''}`}
          >
            <p className='text-lg font-medium text-center'>
              {question.id === selectedId ? question.answer : question.question}
            </p>
          </li>
        ))}
      </ul>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
