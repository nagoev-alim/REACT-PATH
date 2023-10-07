import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Count Up".
 */
const App = () => {

  return (
    <div className='bg-white border-2 shadow rounded max-w-2xl w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Count Up</h1>
      <div className='grid gap-3 place-items-center sm:grid-cols-3'>
        <Item count={100} text='Succeeded projects' time={80} />
        <Item count={140} text='Working hours spent' time={90} />
        <Item count={170} text='Happy clients' time={110} />
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

/**
 * Интерфейс для свойств компонента "Item".
 * @interface
 */
interface IItemProps {
  count: number;  // Количество, которое будет увеличиваться.
  text: string;    // Текст, отображаемый рядом с числом.
  time: number;    // Интервал времени для увеличения числа (по умолчанию 1000 миллисекунд).
}

/**
 * React-компонент для отображения числа, увеличивающегося с течением времени.
 * @function
 * @param {IItemProps} props - Свойства компонента "Item".
 */
const Item = ({ count, text, time = 1000 }: IItemProps) => {
  /**
   * Состояние для отслеживания текущего числа.
   *
   * @type {number}
   */
  const [counter, setCounter] = useState<number>(0);

  /**
   * Эффект, который увеличивает число с течением времени.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(counter => {
        const current = counter < Number(count) ? counter + 1 : count;
        if (current === count) clearInterval(intervalId);
        return current;
      });
    }, time);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className='grid gap-1 place-items-center'>
      <p className='text-5xl font-bold'>{counter}+</p>
      <p>{text}</p>
    </div>
  );
};
