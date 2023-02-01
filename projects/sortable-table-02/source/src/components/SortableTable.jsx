import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from './index.js';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/users';

const SortableTable = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [searchColumns, setSearchColumns] = useState(['name', 'username']);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get();
        data.forEach(item => {
          setData(prev => [...prev, {
            id: item.id,
            name: item.name,
            email: item.email,
            username: item.username,
            address: item.address.city,
            website: item.website,
            phone: item.phone,
          }]);
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const columns = data[0] && Object.keys(data[0]);

  const search = (rows) => {
    return rows.filter(r => searchColumns.some(c => r[c].toString().toLowerCase().indexOf(query.toLowerCase()) > -1));
  };

  return <div className='sortable'>
    <h1 className='title sortable__title'>Sortable Table</h1>
    <form>
      <label>
        <span className='h6'>Search Query</span>
        <input type='text' name='query' value={query} onChange={({ target: { value } }) => setQuery(value)}
               placeholder='Search query' />
      </label>
      <p className='h6'>Select Filter</p>
      <ul className='sortable__filters'>
        {columns && columns.map((column, idx) =>
          <li key={idx}>
            <label>
              <input
                type='checkbox'
                className='visually-hidden input-box'
                checked={searchColumns.includes(column)}
                onChange={() => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns(prev =>
                    checked
                      ? prev.filter(searchColumn => searchColumn !== column)
                      : [...prev, column],
                  );
                }}
              />
              <span className='checkbox'/>
              {column}
            </label>
          </li>,
        )}
      </ul>
    </form>
    <DataTable data={search(data)} />
  </div>;
};

export default SortableTable;
