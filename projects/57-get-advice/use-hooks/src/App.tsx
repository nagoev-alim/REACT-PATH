import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ping } from '@uiball/loaders';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние, хранящее текст полученного совета.
   * @type {string}
   */
  const [advice, setAdvice] = useState<string>('');

  /**
   * Состояние, отслеживающее количество полученных советов.
   * @type {number}
   */
  const [count, setCount] = useState<number>(0);

  /**
   * Состояние, показывающее состояние загрузки данных.
   * @type {boolean}
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Загрузка совета при инициализации компонента.
   */
  useEffect(() => {
    handleGetAdvice();
  }, []);

  /**
   * Функция для получения случайного совета с веб-сервиса.
   * @returns {Promise<void>}
   */

  async function handleGetAdvice(): Promise<void> {
    try {
      setLoading(true);
      const { data: { slip: { advice: text } } } = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(text);
      setCount(v => v + 1);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error('Something went wrong, open dev console.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Get Advice</h1>
      {loading
        ? (
          <div className='grid place-items-center'>
            <Ping size={45} speed={2} color='black' />
          </div>
        ) : (
          <div className='grid place-items-center gap-2'>
            <p>{advice}</p>
            <button className='btn' onClick={handleGetAdvice}>Get advice</button>
            <p>You have read <strong className='font-bold'>{count}</strong> pieces of advice</p>
          </div>
        )
      }
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
