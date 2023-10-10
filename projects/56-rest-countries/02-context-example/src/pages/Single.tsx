import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Loading } from '../components';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения информации о выбранной стране.
 * @component
 */
const Single = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const {isLoading, country, countryBorders, fetchCountry} = useAppContext()
  /**
   * Загрузка информации о стране.
   * @param {string} name - Название страны.
   */
  useEffect(function() {
    if (name) fetchCountry(name);
  }, [name]);

  if (isLoading) {
    return <Loading />;
  }
  return country && (
    <div className='grid gap-4'>
      <button className='btn max-w-max dark:bg-slate-600' onClick={() => navigate(-1)}>Go Back</button>
      <div className='grid gap-4 sm:grid-cols-[40%_1fr] sm:items-center lg:grid-cols-[50%_1fr] lg:gap-10'>
        <img className='border' src={country.flag} alt={country.name} />
        <div>
          <h1 className='text-lg font-bold mb-3'>{country.name}</h1>
          <div className='grid sm:grid-cols-2 text-sm'>
            <div>
              <p className='flex flex-wrap gap-1.5'><span className='font-bold'>Native Name:</span>{country.nativeName}
              </p>
              <p className='flex flex-wrap gap-1.5'><span
                className='font-bold'>Population:</span>{country.population.toLocaleString()}</p>
              <p className='flex flex-wrap gap-1.5'><span className='font-bold'>Region:</span>{country.region}</p>
              <p className='flex flex-wrap gap-1.5'><span className='font-bold'>Sub Region:</span>{country.subregion}
              </p>
              <p className='flex flex-wrap gap-1.5'><span className='font-bold'>Capiital:</span>{country.capital}</p>
            </div>
            <div>
              <p className='flex flex-wrap gap-1.5'>
                <span className='font-bold'>Top Level Domain:</span>
                {country.topLevelDomain.map((tld) => <span key={tld}>{tld}</span>)}
              </p>
              <p className='flex flex-wrap gap-1.5'>
                <span className='font-bold'>Currency:</span>
                {country.currencies && country.currencies[0]?.name ? country.currencies[0]?.name : 'Not found'}
              </p>
              <p className='flex flex-wrap gap-1.5'>
                <span className='font-bold'>Languages:</span>
                {country.languages && country.languages.map((lang) =>
                  <span
                    key={lang.name}>{lang.name}{lang.name === country.languages[country.languages.length - 1].name ? '' : ','}</span>,
                )}
              </p>
            </div>
          </div>
          <div className='grid gap-2 text-sm mt-4'>
            <p className='font-bold'>Border Countries: </p>
            {country.borders && country.borders.length !== 0
              ? (
                <ul className='flex flex-wrap gap-1.5'>
                  {countryBorders.map(border => (
                    <Link
                      className='text-sm bg-white border px-3 py-2 dark:bg-slate-600 dark:border-slate-500 transition-colors'
                      to={`/country/${border}`}
                      key={border}>
                      {border}
                    </Link>
                  ))}
                </ul>
              )
              : 'There is no border country'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
