import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiRefreshCw } from 'react-icons/all';
import { Ping } from '@uiball/loaders';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';

const MainPage = () => {
  const [randomItems, setRandomItems] = useState(JSON.parse(localStorage.getItem('randomMeals')) || []);
  const [searchItems, setSearchItems] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Get random meals
  useEffect(() => {
    (async () => {
      if (randomItems.length === 0) await getRandomMeals();
    })();
  }, []);

  // 🚀 METHODS: ================================
  /**
   * @function getRandomMeals - Get random meals from API
   * @return {Promise<void>}
   */
  const getRandomMeals = async () => {
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
  };

  /**
   * @function onSubmit - Form submit handler
   * @param event
   * @returns {Promise<void>}
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const search = Object.fromEntries(new FormData(form).entries()).search.toLowerCase();

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
  };

  // 🚀 RENDER: ================================
  return <div className='page-main'>
    {/* Form */}
    <form onSubmit={onSubmit}>
      <label>
        <input type='text' name='search' defaultValue={query} placeholder='Search for meals or keywords' />
      </label>
      <button className='button' type='submit'>Submit</button>
      <button className='button' type='button' onClick={getRandomMeals}>
        <FiRefreshCw />
        Get Random
      </button>
    </form>

    {/* Search Results */}
    {isSearchLoading
      ? (<div className='loading'><Ping size={45} speed={2} color='black' /></div>)
      : (searchItems.length !== 0 &&
        <div>
          <h3 className='title'>Search results for <span>'{query}'</span>:</h3>
          <ul>
            {searchItems.map(({ idMeal, strMeal, strMealThumb }, idx) =>
              <li key={idx}>
                <Link to={`/detail/${idMeal}`} state={{ query }}>
                  <img src={strMealThumb} alt={strMeal} />
                  <h3>{strMeal}</h3>
                </Link>
              </li>,
            )}
          </ul>
        </div>
      )}

    {/* Random Meals */}
    {isLoading
      ? (<div className='loading'><Ping size={45} speed={2} color='black' /></div>)
      : (randomItems.length !== 0 &&
        <div>
          <h3 className='title'>Random Meals</h3>
          <ul>
            {randomItems.map(({ idMeal, strMeal, strMealThumb }, idx) =>
              <li key={idx}>
                <Link to={`/detail/${idMeal}`}>
                  <img src={strMealThumb} alt={strMeal} />
                  <h3>{strMeal}</h3>
                </Link>
              </li>,
            )}
          </ul>
        </div>
      )}
  </div>;
};

export default MainPage;
