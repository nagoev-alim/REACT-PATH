import { useAppContext } from './context/AppContext.tsx';
import React from 'react';

/**
 * Перечисление для статусов счетчика.
 * @enum {string}
 */
enum CounterStatus {
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
}

/**
 * Объект, который содержит соответствие между статусом счетчика и соответствующим классом CSS.
 * @type {Object.<CounterStatus, string>}
 */
const CounterClassnameByStatus = {
  [CounterStatus.NEGATIVE]: 'text-red-500',
  [CounterStatus.POSITIVE]: 'text-green-500',
  [CounterStatus.NEUTRAL]: 'text-neutral-900',
};

/**
 * Компонент React для отображения счетчика и управления им.
 * @component
 */
const App = () => {
  const { counter, handleDecrease, handleIncrease, handleReset } = useAppContext();

  /**
   * CSS-класс, определенный на основе статуса счетчика.
   * @type {string}
   */
  let className: string = CounterClassnameByStatus[CounterStatus.NEUTRAL];

  if (counter < 0) {
    className = CounterClassnameByStatus[CounterStatus.NEGATIVE];
  } else if (counter > 0) {
    className = CounterClassnameByStatus[CounterStatus.POSITIVE];
  }

  return (
    <div className='max-w-md w-full mx-auto p-3 grid gap-3 bg-white border-2 rounded-md'>
      <h1 className='text-lg md:text-3xl font-bold text-center'>Counter</h1>
      <p className={`font-bold text-center text-8xl ${className}`}>{counter}</p>
      <div className='grid gap-3 sm:grid-cols-3'>
        <Button className='bg-red-500 hover:bg-red-400' onClick={handleDecrease}>Decrease</Button>
        <Button className='bg-neutral-500 hover:bg-neutral-400' onClick={handleReset}>Reset</Button>
        <Button className='bg-green-500 hover:bg-green-400' onClick={handleIncrease}>Increase</Button>
      </div>
    </div>
  );
};

export default App;

/**
 * Интерфейс для свойств компонента Button.
 * @interface
 */
interface IButtonProps {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}

/**
 * Компонент кнопки.
 * @param {IButtonProps} props - Свойства кнопки.
 * @component
 */
const Button = ({ children, className, onClick }: IButtonProps) => {
  return (
    <button className={`btn font-bold text-white ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
