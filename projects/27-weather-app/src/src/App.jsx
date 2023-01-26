import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineWobble } from '@uiball/loaders';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [data, setData] = useState(null);
  const [city] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) {
      fetchData(city);
    }
  }, []);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).query.trim().toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    fetchData(query);
    form.reset();
  };

  /**
   * @function fetchData - Fetch data from API
   * @param query
   * @return {Promise<void>}
   */
  const fetchData = async (query) => {
    try {
      setIsLoading(true);

      const {
        data: {
          current: { condition: { text, icon }, is_day, temp_c },
          forecast: { forecastday },
          location: { name, region, country },
        },
      } = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=2260a9d16e4a45e1a44115831212511&q=${query}&days=5&aqi=no&alerts=no`);

      setData({ text, icon, is_day, temp_c, forecastday, name, region, country });
      localStorage.setItem('city', query);
      setIsLoading(false);
    } catch (e) {
      toast.error(`${JSON.parse(e.request.response).error.message}`);
      setIsLoading(false);
      localStorage.clear();
      setData(null);
      console.log(e);
    }
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='weather'>
        <h1 className='title'>Weather</h1>
        <header>
          <p>
            {new Date().getDate()},{' '}
            {new Date().toLocaleString('en-En', { month: 'short' })},{' '}
            {new Date().getFullYear()}
          </p>
          <form onSubmit={onSubmit}>
            <label>
              <span className='label'>Search for city</span>
              <input type='text' name='query' placeholder='Enter city name' />
            </label>
            <button className='button' type='submit'>Submit</button>
          </form>
        </header>

        {isLoading && <div className='loader'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>}

        {data && <div className='body'>
          <h3 className='h5'>
            <span>{data.name}</span>{' '}{data.region}, {' '}{data.country}
          </h3>
          <p className='type'>{data.text}</p>
          <img src={data.icon} alt={data.text} />
          <p className='h5'>{data.is_day ? 'Day' : 'Night'}</p>
          <p className='temp'><span>{data.temp_c}</span><sup>°</sup></p>
          <ul>
            {data.forecastday.map(({ date, day: { mintemp_c, maxtemp_c } }) =>
              <li key={date}>
                <p className='date'>{date}</p>
                <div>
                  <p><span>Min:</span>{mintemp_c}<sup>°</sup></p>
                  <p><span>Max:</span>{maxtemp_c}<sup>°</sup></p>
                </div>
              </li>,
            )}
          </ul>
        </div>}
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
