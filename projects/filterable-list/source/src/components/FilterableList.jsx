import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FilterableList = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('usersList')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      if (users.length !== 0) return;

      try {
        setIsLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
        setIsLoading(false);
        localStorage.setItem('usersList', JSON.stringify(data));
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  // 🚀 METHODS: ===============================
  const filteredItems = useMemo(() => {
    return users.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase())
        || item.phone.toLowerCase().includes(query.toLowerCase())
        || item.username.toLowerCase().includes(query.toLowerCase())
        || item.website.toLowerCase().includes(query.toLowerCase());
    });
  }, [users, query]);

  // 🚀 RENDER: ================================
  return <div className='filterable-list'>
    <h1 className='title filterable-list__title'>Filterable List</h1>
    <input type='text' placeholder='Search (name, phone, username, website)'
           value={query}
           onChange={({ target: { value } }) => setQuery(value)} />

    {isLoading
      ? <p>Loading...</p>
      : <ul>
        {filteredItems.map(({ id, name, phone, username, website }) =>
          <li key={id}>
            <p><span className='h6'>Name:</span>{name}</p>
            <p><span className='h6'>Phone:</span>{phone}</p>
            <p><span className='h6'>Username:</span>{username}</p>
            <p><span className='h6'>Website:</span>{website}</p>
          </li>,
        )}
        {filteredItems.length === 0 && 'No user founds'}
      </ul>
    }
  </div>;
};

export default FilterableList;
