import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DotWave } from '@uiball/loaders';
import { FiAtSign, FiCalendar, FiLock, FiMap, FiPhone, FiUser } from 'react-icons/fi';

/**
 * Интерфейс для описания структуры данных о пользователе.
 * @interface
 */
interface User {
  phone: string;
  email: string;
  image: string;
  street: string;
  password: string;
  name: string;
  age: string;
}

/**
 * Интерфейс для описания структуры данных Mock (вспомогательных данных для отображения).
 * @interface
 */
interface Mock {
  name: string;
  src: JSX.Element;
}

/**
 * Массив MOCK содержит вспомогательные данные для отображения различных свойств пользователя.
 * @type {Mock[]}
 */
const MOCK: Mock[] = [
  {
    name: 'name',
    src: <FiUser size={20} />,
  },
  {
    name: 'email',
    src: <FiAtSign size={20} />,
  },
  {
    name: 'age',
    src: <FiCalendar size={20} />,
  },
  {
    name: 'street',
    src: <FiMap size={20} />,
  },
  {
    name: 'phone',
    src: <FiPhone size={20} />,
  },
  {
    name: 'password',
    src: <FiLock size={20} />,
  },
];

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Quote Generators".
 */
const App = () => {
  /**
   * Состояние для отслеживания загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Состояние для хранения данных о случайном пользователе.
   * @type {User | null}
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Состояние для отслеживания активной кнопки.
   * @type {{ label: string, value: string } | null}
   */
  const [activeBtn, setActiveBtn] = useState<{ label: string, value: string } | null>(null);
  /**
   * Эффект, запускающий загрузку данных при монтировании компонента.
   */
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  /**
   * Функция для загрузки данных о случайном пользователе.
   * @returns {Promise<void>}
   */
  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true);
      setUser(null);
      const { data: { results } } = await axios.get('https://randomuser.me/api/');
      setUser(() => {
        const user: User = {
          phone: results[0].phone,
          email: results[0].email,
          image: results[0].picture.large,
          street: `${results[0].location.street.number} ${results[0].location.street.name}`,
          password: results[0].login.password,
          name: `${results[0].name.first} ${results[0].name.last}`,
          age: results[0].dob.age,
        };
        setActiveBtn({
          label: 'name',
          value: user['name'],
        });
        return user;
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setUser(null);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      {user && (
        <div className='grid place-items-center gap-2'>
          <h1 className='text-center font-bold text-4xl'>Random User</h1>
          <img className='rounded-full' src={user.image} alt='image' />
          <p className='grid place-items-center gap-1'>
            <span>My {activeBtn && activeBtn.label} is</span>
            <span className='font-bold'>{activeBtn && activeBtn.value}</span>
          </p>
          <ul className='flex flex-wrap justify-center items-center gap-2'>
            {MOCK.map(({ name, src }) =>
              <li key={name}>
                <button
                  className={`btn ${name === (activeBtn && activeBtn.label) ? 'bg-neutral-500 text-white hover:bg-neutral-400' : ''}`}
                  onClick={() => setActiveBtn({ label: name, value: user[name] })}>
                  {src}
                </button>
              </li>,
            )}
          </ul>
          <button className='btn' onClick={fetchData}>Generate</button>
        </div>
      )}

      {isLoading && (
        <div className='grid place-items-center gap-3'>
          <DotWave size={47} speed={1} color='black' />
          <p>Loading</p>
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
