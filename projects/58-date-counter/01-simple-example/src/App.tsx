import { Toaster } from 'react-hot-toast';
import { useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Date Counter".
 */
const App = () => {
  /**
   * Состояние, хранящее текущее количество дней.
   * @type {number}
   */
  const [count, setCount] = useState<number>(0);

  /**
   * Состояние, хранящее значение шага изменения количества дней.
   * @type {number}
   */
  const [step, setStep] = useState<number>(1);

  /**
   * Создание объекта даты с заданной датой.
   * @type {Date}
   */
  const date = new Date('July 18 2018');
  date.setDate(date.getDate() + count);

  /**
   * Функция для увеличения количества дней.
   */
  function incrementCount() {
    setCount(v => v + step);
  }

  /**
   * Функция для уменьшения количества дней.
   */
  function decrementCount() {
    setCount(v => v - step);
  }

  /**
   * Функция для увеличения значения шага.
   */
  function incrementStep() {
    setStep(v => v + 1);
  }

  /**
   * Функция для уменьшения значения шага.
   */
  function decrementStep() {
    setStep(v => v - 1);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Date Counter</h1>
      <div className='flex justify-center items-center gap-3'>
        <button className='btn' onClick={decrementCount}>-</button>
        <p>Count Days: {count}</p>
        <button className='btn' onClick={incrementCount}>+</button>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <button className='btn' onClick={decrementStep}>-</button>
        <p>Step Days: {step}</p>
        <button className='btn' onClick={incrementStep}>+</button>
      </div>
      <p className='flex gap-1 justify-center'>
        <span>{count === 0 ? 'Today is ' : count > 0 ? `${count} days from today is ` : `${Math.abs(count)} days ago was `}</span>
        <span className='font-bold'>{date.toDateString()}</span>
      </p>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
