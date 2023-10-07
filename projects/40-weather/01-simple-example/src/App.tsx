import { toast, Toaster } from 'react-hot-toast';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { LineWobble } from '@uiball/loaders';

/**
 * @interface {Object} Weather - Информация о погоде.
 * @property {string} text - Описание погоды.
 * @property {string} icon - URL иконки погоды.
 * @property {string} is_day - День или ночь.
 * @property {string} temp_c - Температура в градусах Цельсия.
 * @property {string} forecastday - Прогноз на дни.
 * @property {string} name - Название города.
 * @property {string} region - Регион.
 * @property {string} country - Страна.
 */
interface Weather {
  text: string;
  icon: string;
  is_day: string;
  temp_c: string;
  forecastday: string;
  name: string;
  region: string;
  country: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Weather".
 */
const App = () => {
  /**
   * Состояние для отображения информации о погоде.
   *
   * @type {Weather | null}
   */
  const [weather, setWeather] = useState<Weather | null>(null);

  /**
   * Состояние для хранения выбранного города.
   *
   * @type {string | null}
   */
  const [city, setCity] = useState<string | null>(() => {
    const city = localStorage.getItem('city');
    return city ?? null;
  });

  /**
   * Состояние для отображения индикатора загрузки.
   *
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (city) fetchData(city);
  }, [city]);

  /**
   * Функция для обработки отправки формы.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim().toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    await fetchData(query);
    form.reset();
  }

  /**
   * Функция для загрузки информации о погоде.
   *
   * @param {string} query - Запрос для получения информации о погоде.
   * @returns {Promise<void>}
   */
  async function fetchData(query: string): Promise<void> {
    setIsLoading(true);
    try {
      const {
        data: {
          current: { condition: { text, icon }, is_day, temp_c },
          forecast: { forecastday },
          location: { name, region, country },
        },
      } = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=2260a9d16e4a45e1a44115831212511&q=${query}&days=5&aqi=no&alerts=no`);
      setWeather({ text, icon, is_day, temp_c, forecastday, name, region, country });
      localStorage.setItem('city', query);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(`${JSON.parse(e.request.response).error.message}`);
        setIsLoading(false);
        localStorage.clear();
        setWeather(null);
        setCity(null);
        console.log(e);
      }
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Weather</h1>
      <header className='grid gap-2 place-items-center'>
        <p className='font-bold'>
          {new Date().getDate()},{' '}
          {new Date().toLocaleString('en-En', { month: 'short' })},{' '}
          {new Date().getFullYear()}
        </p>

        <form className='grid gap-2 w-full' onSubmit={handleSubmit}>
          <label className='grid gap-1'>
            <span className='text-sm font-medium text-center'>Search for city</span>
            <input className='input' type='text' name='query' placeholder='Enter city name' />
          </label>
          <button className='btn' type='submit'>Submit</button>
        </form>
      </header>

      {isLoading && (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )}

      {weather && (
        <div className='grid place-items-center gap-2'>
          <h3 className='text-lg'>
            <span>{weather.name}</span>{' '}{weather.region}, {' '}{weather.country}
          </h3>
          <p className='font-medium'>{weather.text}</p>
          <img src={weather.icon} alt={weather.text} />
          <p className='font-bold'>{weather.is_day ? 'Day' : 'Night'}</p>
          <p className='font-bold'><span>{weather.temp_c}</span><sup>°</sup></p>
          <ul className='w-full grid gap-2 sm:grid-cols-3'>
            {weather.forecastday.map(({ date, day: { mintemp_c, maxtemp_c } }) =>
              <li className='grid gap-1 place-items-center' key={date}>
                <p className='font-bold text-md'>{date}</p>
                <div>
                  <p className='flex gap-1'><span className='font-bold'>Min:</span>{mintemp_c}<sup>°</sup></p>
                  <p className='flex gap-1'><span className='font-bold'>Max:</span>{maxtemp_c}<sup>°</sup></p>
                </div>
              </li>,
            )}
          </ul>
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
