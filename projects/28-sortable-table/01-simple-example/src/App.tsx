import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { DataTable } from './components';

// Устанавливаем базовый URL для запросов axios.
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Интерфейс для описания структуры данных.
 * @interface
 */
interface Data {
  id: string;
  name: string;
  email: string;
  username: string;
  address: string;
  website: string;
  phone: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Sortable Table".
 */
const App = () => {
  // Состояния для хранения данных, строки поиска и выбранных столбцов для поиска.

  const [data, setData] = useState<Data[] | []>([]);
  const [query, setQuery] = useState<string>('');
  const [searchColumns, setSearchColumns] = useState<string[]>(['name', 'username']);
  // Загрузка данных при монтировании компонента.

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get();
        data.forEach(item => {
          setData(v => [...v, {
            id: item.id,
            name: item.name,
            email: item.email,
            username: item.username,
            address: item.address.city,
            website: item.website,
            phone: item.phone,
          }]);
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  // Определение столбцов таблицы на основе данных.
  const columns: string[] = data[0] && Object.keys(data[0]);

  /**
   * Функция для фильтрации строк данных по заданному запросу.
   * @param {Data[]} rows - Массив данных.
   * @returns {Data[]} Отфильтрованный массив данных.
   */
  function handleSearch(rows: Data[]) {
    return rows.filter(r => searchColumns.some(c => r[c].toString().toLowerCase().indexOf(query.toLowerCase()) > -1));
  }

  /**
   * Функция для обработки изменения строки поиска.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения ввода.
   */
  function handleQuery(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  /**
   * Функция для обработки изменения выбранных столбцов для поиска.
   * @param {string} column - Название столбца.
   */
  function handleCheckbox(column: string): void {
    const checked = searchColumns.includes(column);
    setSearchColumns(v => checked ? v.filter(searchColumn => searchColumn !== column) : [...v, column]);
  }

  // Визуализация компонента, включая форму поиска и отображение таблицы данных.
  return (
    <div className='max-w-6xl mx-auto w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Sortable Table</h1>
      <form className='grid gap-2 bg-white p-2 border rounded overflow-auto'>
        <label>
          <span className='font-medium text-sm'>Search Query</span>
          <input
            className='input'
            type='text'
            name='query'
            value={query}
            onChange={handleQuery}
            placeholder='Search query'
          />
        </label>
        <p className='font-medium text-sm'>Select Filter</p>
        <ul className='grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]'>
          {columns && columns.map((column, idx) =>
            <li className='p-2 border' key={idx}>
              <label className='flex gap-2'>
                <input
                  type='checkbox'
                  className='visually-hidden'
                  checked={searchColumns.includes(column)}
                  onChange={() => handleCheckbox(column)}
                />
                <span className='checkbox' />
                {column}
              </label>
            </li>,
          )}
        </ul>
      </form>
      <DataTable data={handleSearch(data)} />
    </div>
  );
};

export default App;
