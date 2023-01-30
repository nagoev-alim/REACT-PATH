import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const StateCapitalLookup = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('stateCapitals')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      if (data.length !== 0) return;

      try {
        setIsLoading(true);
        const { data } = await axios.get('./mock/mock.json');
        setData(data);
        setIsLoading(false);
        localStorage.setItem('stateCapitals', JSON.stringify(data));
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  // 🚀 METHODS: ===============================

  const filteredItems = useMemo(() => {
    return data.filter(item => {
      return item.abbr.toLowerCase().includes(query.toLowerCase())
        || item.capital.toLowerCase().includes(query.toLowerCase())
        || item.lat.toLowerCase().includes(query.toLowerCase())
        || item.long.toLowerCase().includes(query.toLowerCase())
        || item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);

  // 🚀 RENDER: ================================
  return <div className='filterable-list'>
    <h1 className='title filterable-list__title'>State Capital Lookup</h1>
    <input type='text' placeholder='Search (abbr, capital, lat, long, name)'
           value={query}
           onChange={({ target: { value } }) => setQuery(value)}
    />
    {isLoading ? <p>Loading...</p> : <ul>
      {filteredItems.map(({ abbr, capital, lat, long, name }) =>
        <li key={abbr}>
          <p><span className='h6'>Name</span><span>{name}</span></p>
          <p><span className='h6'>Capital</span><span>{capital} ({abbr})</span></p>
          <p><span className='h6'>Latitude</span><span>{lat}</span></p>
          <p><span className='h6'>Longitude</span><span>{long}</span></p>
        </li>,
      )}

      {filteredItems.length === 0 && 'No state capital founds'}
    </ul>}
  </div>;
};

export default StateCapitalLookup;
