import { useState } from 'react';
import useGeolocation from './hooks/useGeolocation.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Geo Position".
 */
const App = () => {
  /**
   * Состояние, хранящее количество нажатий на кнопку.
   *
   * @type {number}
   */
  const [countClicks, setCountClicks] = useState<number>(0);

  /**
   * Пользовательский хук, предоставляющий информацию о геопозиции.
   *
   * @type {object}
   * @property {boolean} isLoading - Флаг загрузки данных о геопозиции.
   * @property {string | null} error - Текст ошибки, если она возникла при получении геоданных.
   * @property {object} position - Объект, содержащий координаты геопозиции (широта и долгота).
   * @property {number | null} position.lat - Широта геопозиции.
   * @property {number | null} position.lng - Долгота геопозиции.
   * @property {function} getPosition - Функция для запроса геопозиции.
   */
  const { isLoading, error, position: { lat, lng }, getPosition } = useGeolocation();

  /**
   * Обработчик щелчка по кнопке "Get my position".
   * Увеличивает счетчик нажатий и запрашивает геопозицию.
   */
  function handleClick(): void {
    setCountClicks((v) => v + 1);
    getPosition();
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid place-items-center gap-3'>
      <h1 className='text-center font-bold text-4xl'>Geo Position</h1>
      <button className='btn' onClick={handleClick} disabled={isLoading}>Get my position</button>
      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p className='text-center'>
          Your GPS position:{' '}
          <a
            className='text-blue-400 font-bold'
            target='_blank'
            rel='noreferrer'
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p className='text-center'>You requested position <span className='font-bold'>{countClicks}</span> times</p>
    </div>
  );
};

export default App;
