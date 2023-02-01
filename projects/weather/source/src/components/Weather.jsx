import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { LineWobble } from '@uiball/loaders';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) fetchData(city);
  }, []);

  // 🚀 METHODS: ================================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).query.trim().toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    await fetchData(query);
    form.reset();
  };

  const fetchData = async (query) => {
    setIsLoading(true);
    try {
      const {
        data: {
          current: { condition: { text, icon }, is_day, temp_c },
          forecast: { forecastday },
          location: { name, region, country },
        },
      } = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=2260a9d16e4a45e1a44115831212511&q=${query}&days=5&aqi=no&alerts=no`);
      setWeather({ text, icon, is_day, temp_c, forecastday, name, region, country });
      localStorage.setItem('city', query);
      setIsLoading(false);
    } catch (e) {
      toast.error(`${JSON.parse(e.request.response).error.message}`);
      setIsLoading(false);
      localStorage.clear();
      setWeather(null);
      setCity(null);
      console.log(e);
    }
  };

  // 🚀 RENDER: ================================
  return <div className='weather'>
    <h1 className='title weather__title'>Weather</h1>

    <header className='weather__header'>
      <p className='h5'>
        {new Date().getDate()},{' '}
        {new Date().toLocaleString('en-En', { month: 'short' })},{' '}
        {new Date().getFullYear()}
      </p>

      <form className='weather__form' onSubmit={onSubmit}>
        <label>
          <span className='label'>Search for city</span>
          <input type='text' name='query' placeholder='Enter city name' />
        </label>
        <button className='button button--fluid button--primary' type='submit'>Submit</button>
      </form>
    </header>

    {isLoading && <div className='loading'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>}

    {weather &&
      <div className='weather__body'>
        <h3 className='h6'>
          <span>{weather.name}</span>{' '}{weather.region}, {' '}{weather.country}
        </h3>
        <p className='type'>{weather.text}</p>
        <img src={weather.icon} alt={weather.text} />
        <p className='h6'>{weather.is_day ? 'Day' : 'Night'}</p>
        <p className='h4'><span>{weather.temp_c}</span><sup>°</sup></p>
        <ul>
          {weather.forecastday.map(({ date, day: { mintemp_c, maxtemp_c } }) =>
            <li key={date}>
              <p className='h5'>{date}</p>
              <div>
                <p><span className='h6'>Min:</span>{mintemp_c}<sup>°</sup></p>
                <p><span className='h6'>Max:</span>{maxtemp_c}<sup>°</sup></p>
              </div>
            </li>,
          )}
        </ul>
      </div>}
  </div>;
};

export default Weather;
