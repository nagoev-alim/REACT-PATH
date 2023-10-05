import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

/**
 * Интерфейс для данных о пользователях.
 * @interface
 */
interface Data {
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Filterable List".
 */
const App = () => {
  // Состояние для хранения списка пользователей.
  const [users, setUsers] = useState<Data[] | []>(() => {
    const usersList = localStorage.getItem('usersList');
    return usersList ? JSON.parse(usersList) : [];
  });

  // Состояние для отслеживания загрузки данных.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Состояние для хранения строки поиска.
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Загрузка данных о пользователях при их отсутствии в локальном хранилище.
    (async () => {
      if (users.length !== 0) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get<Data>('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
        setIsLoading(false);
        localStorage.setItem('usersList', JSON.stringify(data));
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  // Создание отфильтрованного списка пользователей на основе введенного запроса.
  const filteredItems = useMemo(() => {
    return users.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase())
        || item.phone.toLowerCase().includes(query.toLowerCase())
        || item.username.toLowerCase().includes(query.toLowerCase())
        || item.website.toLowerCase().includes(query.toLowerCase());
    });
  }, [users, query]);

  // Обработчик изменения строки поиска.
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  return (
    <div className='max-w-md w-full p-1 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Filterable List</h1>
      <div className='bg-white p-3 border-2 rounded'>
        <input
          className='input'
          type='text'
          placeholder='Search (name, phone, username, website)'
          value={query}
          onChange={handleChange}
        />
      </div>
      {isLoading
        ? (<p>Loading...</p>)
        : (
          <ul className='grid gap-2'>
            {filteredItems.map(({ id, name, phone, username, website }: Data) =>
              <li className='bg-white' key={id}>
                <p className='grid grid-cols-2'>
                  <span className='border font-medium p-2'>Name:</span>
                  <span className='p-2 border'>{name}</span>
                </p>
                <p className='grid grid-cols-2'>
                  <span className='border font-medium p-2'>Phone:</span>
                  <span className='p-2 border'>{phone}</span>
                </p>
                <p className='grid grid-cols-2'>
                  <span className='border font-medium p-2'>Username:</span>
                  <span className='p-2 border'>{username}</span>
                </p>
                <p className='grid grid-cols-2'>
                  <span className='border font-medium p-2'>Website:</span>
                  <span className='p-2 border'>{website}</span>
                </p>
              </li>,
            )}
            {filteredItems.length === 0 && 'No user founds'}
          </ul>
        )
      }
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
