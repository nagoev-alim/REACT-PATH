import axios from 'axios';
import { API_URL } from '../utils/constants.ts';
import { FormEvent, useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { Ping } from '@uiball/loaders';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

axios.defaults.baseURL = API_URL;

/**
 * React-компонент главной страницы "Home".
 * @function
 * @name Home
 */
const Home = () => {
  /**
   * Состояние, содержащее случайные блюда.
   * @type {Object[]}
   */
  const [randomItems, setRandomItems] = useState<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }[] | []>(() => {
    const randomMeals = localStorage.getItem('randomMeals');
    return randomMeals ? JSON.parse(randomMeals) : [];
  });
  /**
   * Состояние, содержащее результаты поиска.
   * @type {Object[]}
   */
  const [searchItems, setSearchItems] = useState([]);

  /**
   * Состояние для хранения текущего поискового запроса.
   * @type {string}
   */
  const [query, setQuery] = useState<string>('');

  /**
   * Состояние для отслеживания состояния загрузки данных случайных блюд.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Состояние для отслеживания состояния загрузки данных по поиску.
   * @type {boolean}
   */
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  /**
   * Эффект, выполняющийся при загрузке компонента, для получения случайных блюд.
   */
  useEffect(function() {
    (async () => {
      if (randomItems.length === 0) await getRandomMeals();
    })();
  }, []);

  /**
   * Функция для получения случайных блюд.
   * @returns {Promise<void>}
   */
  async function getRandomMeals(): Promise<void> {
    try {
      setIsLoading(true);
      let resultData = [];
      for (let i = 0; i < 6; i++) {
        const { data: { meals } } = await axios.get('random.php');
        resultData = [...resultData, meals[0]];
      }
      if (resultData.length !== 0) {
        setRandomItems(resultData);
        localStorage.setItem('randomMeals', JSON.stringify(resultData));
      }
      setIsLoading(false);
      setIsLoading(false);
      setSearchItems([]);
    } catch (e) {
      setIsSearchLoading(false);
      toast.error('Something wrong, open dev console.');
      console.log(e);
    }
  }

  /**
   * Функция для обработки отправки формы поиска.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const search = (formData.get('search') as string).trim().toLowerCase();
    if (search.length === 0) {
      toast.error('Please enter a search term.');
      return;
    }
    try {
      setIsSearchLoading(true);
      const { data: { meals } } = await axios.get(`search.php?s=${search}`);
      setQuery(search);
      if (meals === null) {
        toast.error('There are no search results. Try again!');
      } else {
        setSearchItems(meals);
        setIsSearchLoading(false);
      }
    } catch (e) {
      setIsSearchLoading(false);
      toast.error('Something wrong, open dev console.');
      console.log(e);
    }
  }

  return (
    <div className='grid gap-3'>
      <form className='grid gap-2 p-3 bg-white border-2 rounded' onSubmit={handleSubmit}>
        <label>
          <input className='input' type='text' name='search' defaultValue={query}
                 placeholder='Search for meals or keywords' />
        </label>
        <button className='btn' type='submit'>Submit</button>
        <button className='btn gap-1' type='button' onClick={getRandomMeals}>
          <FiRefreshCw />
          Get Random
        </button>
      </form>

      {isSearchLoading
        ? (
          <div className='grid place-items-center'>
            <Ping size={45} speed={2} color='black' />
          </div>
        )
        : searchItems.length !== 0 && (
        <div className='grid gap-3'>
          <h3 className='font-bold'>Search results for <span className='uppercase'>'{query}'</span>:</h3>
          <ul className='grid gap-3 grid-cols-2 md:grid-cols-3'>
            {searchItems.map(({ idMeal, strMeal, strMealThumb }, idx) =>
              <li className='p-2 border-2 rounded bg-white' key={idx}>
                <Link to={`/detail/${idMeal}`} state={{ query }} className='grid gap-2'>
                  <img className='rounded' src={strMealThumb} alt={strMeal} />
                  <h3 className='font-bold text-sm'>{strMeal}</h3>
                </Link>
              </li>,
            )}
          </ul>
        </div>
      )}

      {isLoading
        ? (
          <div className='loading'>
            <Ping size={45} speed={2} color='black' />
          </div>
        )
        : randomItems.length !== 0 && (
        <div className='grid gap-3'>
          <h3 className='font-bold'>Random Meals</h3>
          <ul className='grid gap-3 grid-cols-2 md:grid-cols-3'>
            {randomItems.map(({ idMeal, strMeal, strMealThumb }, idx) =>
              <li className='p-2 border-2 rounded bg-white' key={idx} title={strMeal}>
                <Link to={`/detail/${idMeal}`} className='grid gap-2'>
                  <img className='rounded' src={strMealThumb} alt={strMeal} />
                  <h3 className='font-bold text-sm'>{strMeal}</h3>
                </Link>
              </li>,
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Home;
