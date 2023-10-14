import { Filter, Loading } from '../components';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения списка стран.
 * @component
 */
const Home = () => {
  const { filtered, isLoading } = useAppContext();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='grid gap-4 px-3 lg:px-0'>
      <Filter />
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
