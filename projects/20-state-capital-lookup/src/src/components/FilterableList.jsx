import { useMemo, useState } from 'react';

const FilterableList = ({ data, isLoading }) => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [query, setQuery] = useState('');

  // =====================
  // 🚀 Methods
  // =====================
  const filteredItems = useMemo(() => {
    return data.filter(item => {
      return item.abbr.toLowerCase().includes(query.toLowerCase())
        || item.capital.toLowerCase().includes(query.toLowerCase())
        || item.lat.toLowerCase().includes(query.toLowerCase())
        || item.long.toLowerCase().includes(query.toLowerCase())
        || item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <label>
      <input type='text' value={query} onChange={({ target: { value } }) => setQuery(value)}
             placeholder='Search (abbr, capital, lat, long, name)' />
    </label>
    {isLoading ? <p>Loading...</p> : <ul>
      {filteredItems.map(({ abbr, capital, lat, long, name }) =>
        <li key={abbr}>
          <p><span>Name</span><span>{name}</span></p>
          <p><span>Capital</span><span>{capital} ({abbr})</span></p>
          <p><span>Latitude</span><span>{lat}</span></p>
          <p><span>Longitude</span><span>{long}</span></p>
        </li>,
      )}

      {filteredItems.length === 0 && 'No state capital founds'}
    </ul>}
  </>;
};
export default FilterableList;
