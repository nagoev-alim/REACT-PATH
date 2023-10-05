import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import mock from './mock/mock.json';

/**
 * Состояние элемента данных о штате.
 * @interface {Object} State
 * @property {string} abbr - Аббревиатура штата.
 * @property {string} name - Название штата.
 * @property {string} capital - Столица штата.
 * @property {string} lat - Широта.
 * @property {string} long - Долгота.
 */
interface State {
  abbr: string;
  name: string;
  capital: string;
  lat: string;
  long: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "State Capital Lookup".
 */
const App = () => {
  const [data, setData] = useState<State[] | []>(() => {
    const stateCapitals = localStorage.getItem('stateCapitals');
    return stateCapitals ? JSON.parse(stateCapitals) : [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (() => {
      if (data.length !== 0) return;
      try {
        setIsLoading(true);
        setData(mock);
        setIsLoading(false);
        localStorage.setItem('stateCapitals', JSON.stringify(mock));
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);
  /**
   * Отфильтрованные элементы данных на основе введенного запроса.
   * @type {State[]}
   */
  const filteredItems = useMemo(() => {
    return data.filter(item => {
      return item.abbr.toLowerCase().includes(query.toLowerCase())
        || item.capital.toLowerCase().includes(query.toLowerCase())
        || item.lat.toLowerCase().includes(query.toLowerCase())
        || item.long.toLowerCase().includes(query.toLowerCase())
        || item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);

  /**
   * Обработчик изменения ввода.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения ввода.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  return (
    <div className='max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>State Capital Lookup</h1>
      <div className='bg-white p-2 border rounded'>
        <input
          className='input'
          type='text'
          placeholder='Search (abbr, capital, lat, long, name)'
          value={query}
          onChange={handleChange}
        />
      </div>
      {isLoading
        ? (<p>Loading...</p>)
        : (
          <>
            <ul className='grid gap-2'>
              {filteredItems.map(({ abbr, capital, lat, long, name }) =>
                <li className='bg-white' key={abbr}>
                  <p className='grid grid-cols-2'>
                    <span className='font-medium p-2 border'>Name</span>
                    <span className='p-2 border'>{name}</span>
                  </p>
                  <p className='grid grid-cols-2'>
                    <span className='font-medium p-2 border'>Capital</span>
                    <span className='p-2 border'>{capital} ({abbr})</span>
                  </p>
                  <p className='grid grid-cols-2'>
                    <span className='font-medium p-2 border'>Latitude</span>
                    <span className='p-2 border'>{lat}</span>
                  </p>
                  <p className='grid grid-cols-2'>
                    <span className='font-medium p-2 border'>Longitude</span>
                    <span className='p-2 border'>{long}</span>
                  </p>
                </li>,
              )}
            </ul>
            {filteredItems.length === 0 && 'No state capital founds'}
          </>
        )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
