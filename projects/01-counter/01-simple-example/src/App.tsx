import { useState } from 'react';

/**
 * Перечисление классов стилей для отображения счетчика в разных состояниях.
 * @enum {string}
 */
enum CounterClassNames {
  Negative = 'text-red-500',
  Positive = 'text-green-500',
  Neutral = 'text-neutral-900',
}

/**
 * Компонент React для отображения счетчика и управления им.
 * @component
 */
const App = () => {
  /**
   * Состояние счетчика.
   * @type {number}
   */
  const [counter, setCounter] = useState<number>(0);

  /**
   * Класс стилей для отображения счетчика.
   * @type {CounterClassNames}
   */
  const className: CounterClassNames = counter < 0
    ? CounterClassNames.Negative
    : counter > 0
      ? CounterClassNames.Positive
      : CounterClassNames.Neutral;

  /**
   * Обработчик уменьшения значения счетчика.
   */
  function handleDecrease() {
    setCounter(v => v - 1);
  }

  /**
   * Обработчик увеличения значения счетчика.
   */
  function handleIncrease() {
    setCounter(v => v + 1);
  }

  /**
   * Обработчик сброса значения счетчика.
   */
  function handleReset() {
    setCounter(0);
  }

  return (
    <div className='max-w-md w-full mx-auto p-3 grid gap-3 bg-white border-2 rounded-md'>
      <h1 className='text-lg md:text-3xl font-bold text-center'>Counter</h1>
      <p className={`font-bold text-center text-8xl ${className}`}>{counter}</p>
      <div className='grid gap-3 sm:grid-cols-3'>
        <button className='btn font-bold text-white bg-red-500 hover:bg-red-400' onClick={handleDecrease}>
          Decrease
        </button>
        <button className='btn font-bold text-white bg-neutral-500 hover:bg-neutral-400' onClick={handleReset}>
          Reset
        </button>
        <button className='btn font-bold text-white bg-green-500 hover:bg-green-400' onClick={handleIncrease}>
          Increase
        </button>
      </div>
    </div>
  );
};

export default App;
