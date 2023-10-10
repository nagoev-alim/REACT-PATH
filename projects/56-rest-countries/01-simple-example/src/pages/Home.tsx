import { useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_COUNTRIES_URL } from '../utils/constants.ts';
import { Filter, Loading } from '../components';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Интерфейс, представляющий информацию о стране.
 * @interface
 */
interface Country {
  capital: string;
  flags: {
    svg: string;
    png: string;
  };
  independent: boolean;
  name: string;
  population: number;
  region: string;
}

/**
 * Компонент для отображения списка стран.
 * @component
 */
const Home = () => {
  const [filtered, setFiltered] = useState<Country[] | []>([]);
  const [countries, setCountries] = useState<Country[] | []>(() => {
    const countriesStorage = localStorage.getItem('countriesStorage');
    return countriesStorage ? JSON.parse(countriesStorage) : [];
  });
  const [loading, setLoading] = useState(false);
  /**
   * Загрузка информации о странах.
   */
  useEffect(function() {
    if (countries.length === 0) fetchCountries();
  }, []);

  /**
   * Функция для получения информации о странах из API.
   */
  async function fetchCountries(): Promise<void> {
    try {
      setLoading(true);
      const { data } = await axios.get<Country[]>(ALL_COUNTRIES_URL);
      setCountries(data);
      localStorage.setItem('countriesStorage', JSON.stringify(data));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error('Something wrong, open dev console.');
      }
    } finally {
      setLoading(false);
    }
  }

  /**
   * Обработчик фильтрации списка стран.
   *
   * @param {string} query - Строка запроса для поиска стран.
   * @param {string} region - Регион для фильтрации стран.
   */
  function handleFilter(query: string, region: string): void {
    let copy = [...countries];
    copy = region ? copy.filter(item => item.region.includes(region)) : copy;
    copy = query ? copy.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : copy;
    setFiltered(copy);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='grid gap-4 px-3 lg:px-0'>
      <Filter handleFilter={handleFilter} />
      <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filtered.map((country) => (
          <li className='' key={country.name}>
            <Link to={`country/${country.name.toLowerCase()}`}>
              <div className='max-h-[235px] min-h-[235px] h-full md:max-h-[125px] md:min-h-[125px]'>
                <img className='w-full h-full object-cover' src={country.flags.svg} alt={country.name} />
              </div>
              <div className='bg-white p-3 border md:text-sm dark:bg-slate-600 dark:border-slate-500 transition-colors'>
                <h3 className='text-lg font-bold sm:text-base'>{country.name}</h3>
                <p className='flex gap-1.5'><span
                  className='font-bold'>Population:</span><span>{country.population.toLocaleString()}</span></p>
                <p className='flex gap-1.5'><span className='font-bold'>Region:</span><span>{country.region}</span></p>
                <p className='flex gap-1.5'><span className='font-bold'>Capital:</span><span>{country.capital}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
