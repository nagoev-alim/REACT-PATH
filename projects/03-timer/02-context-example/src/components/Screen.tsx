import { useAppContext } from '../context/AppContext.tsx';


/**
 * Компонент для отображения экрана таймера и управления им.
 * @component
 */
const Screen = () => {
  /**
   * Получение данных таймера и обработчиков событий из контекста приложения.
   */
  const { timer, handleClick, buttonIcon, handleReset } = useAppContext();
  return (
    <div className='grid place-items-center gap-3'>
      <div className='flex justify-center items-center text-6xl font-bold'>
        <span>{timer.minutes}</span>:<span>{timer.seconds}</span>
      </div>
      <button className='btn' onClick={handleClick}>{buttonIcon}</button>
      <button className='btn w-full font-bold text-white border-red-500 bg-red-400 hover:bg-red-300'
              onClick={handleReset}>
        Reset Timer
      </button>
    </div>
  );
};

export default Screen;
