import { Toaster } from 'react-hot-toast';
import { ChangeEvent, useState } from 'react';


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
  const date: Date = new Date('July 18 2018');
  date.setDate(date.getDate() + count);

  /**
   * Функция для увеличения количества дней.
   * @function
   * @name incrementCount
   */
  function incrementCount(): void {
    setCount(v => v + step);
  }

  /**
   * Функция для уменьшения количества дней.
   * @function
   * @name decrementCount
   */
  function decrementCount(): void {
    setCount(v => v - step);
  }

  /**
   * Функция для сброса значения количества дней и шага в исходное состояние.
   * @function
   * @name handleReset
   */
  function handleReset(): void {
    setCount(0);
    setStep(1);
  }

  /**
   * Функция для обработки изменения значения шага.
   * @function
   * @name handleStep
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения.
   */
  function handleStep(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setStep(+value);
  }

  /**
   * Функция для обработки изменения значения количества дней.
   * @function
   * @name handleCount
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения.
   */
  function handleCount(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setCount(+value);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Date Counter</h1>
      <div className='grid gap-2 place-items-center'>
        <input className='w-full' type='range' min='0' max='10' value={step} onChange={handleStep} />
        <span>Step Days: {step}</span>
      </div>
      <div className='flex justify-center gap-2'>
        <button className='btn' onClick={decrementCount}>-</button>
        <input className='input' type='number' value={count} onChange={handleCount} />
        <button className='btn' onClick={incrementCount}>+</button>
      </div>
      <p className='flex gap-1 justify-center'>
        <span>{count === 0 ? 'Today is ' : count > 0 ? `${count} days from today is ` : `${Math.abs(count)} days ago was `}</span>
        <span className='font-bold'>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? <button className='btn' onClick={handleReset}>Reset</button> : null}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
