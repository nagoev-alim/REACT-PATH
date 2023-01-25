import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { capitalStr } from './utils/capitalStr.js';
import { formatter } from './utils/formatter.js';
import mock from './mock/mock.js';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [filtersBtn] = useState(['all', ...new Set(mock.map((i) => i.company))]);
  const [activeFilter, setActiveFilter] = useState(filtersBtn[0]);
  const [products, setProducts] = useState(mock);
  const [query, setQuery] = useState('');

  // Filtered products
  const filteredItems = useMemo(() => {
    return products.filter(item => {
      return item.company.toLowerCase().includes(query.toLowerCase())
        || item.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onFilter - Filters products
   * @param btn
   */
  const onFilter = btn => {
    setActiveFilter(btn);
    setProducts(btn === 'all' ? mock : mock.filter(({ company }) => company === btn));
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='products'>
        <h1 className='title'>Products Filter</h1>
        <div className='container'>
          <div className='filter'>
            <h3>Search</h3>

            <label>
              <input type='text'
                     value={query}
                     onChange={({ target: { value } }) => setQuery(value)}
                     placeholder='Search' />
            </label>

            <h3>Company</h3>

            <ul className='filters'>
              {filtersBtn.map((btn, idx) =>
                <li key={idx}>
                  <button className={`button ${activeFilter === btn ? 'active' : ''}`} onClick={() => onFilter(btn)}>
                    {capitalStr(btn)}
                  </button>
                </li>,
              )}
            </ul>
          </div>

          <ul className='list'>
            {filteredItems.map(({ id, title, company, image, price }) =>
              <li key={id}>
                <div className='header'>
                  <img src={image} alt={title} />
                </div>
                <div className='body'>
                  <h3>{title} ({company})</h3>
                  <p>{formatter.format(price)}</p>
                </div>
              </li>,
            )}
            {filteredItems.length === 0 && <h3>No products found</h3>}
          </ul>
        </div>
      </div>

    </div>

    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
