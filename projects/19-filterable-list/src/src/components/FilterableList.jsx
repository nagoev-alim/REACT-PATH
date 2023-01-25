import { useMemo, useState } from 'react';

const FilterableList = ({ users, isLoading }) => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [query, setQuery] = useState('');

  // =====================
  // 🚀 Methods
  // =====================
  const filteredItems = useMemo(() => {
    return users.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase())
        || item.phone.toLowerCase().includes(query.toLowerCase())
        || item.username.toLowerCase().includes(query.toLowerCase())
        || item.website.toLowerCase().includes(query.toLowerCase())
    });
  }, [users, query]);

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <label>
      <input type='text' value={query} onChange={({ target: { value } }) => setQuery(value)} placeholder='Search (name, phone, username, website)' />
    </label>
    {isLoading ? <p>Loading...</p> : <ul>
      {filteredItems.map(({ id, name, phone, username, website }) =>
        <li key={id}>
          <h3><span>Name:</span>{name}</h3>
          <p><span>Phone:</span>{phone}</p>
          <p><span>Username:</span>{username}</p>
          <p><span>Website:</span>{website}</p>
        </li>,
      )}

      {filteredItems.length === 0 && 'No user founds'}
    </ul>}
  </>;
};
export default FilterableList;
