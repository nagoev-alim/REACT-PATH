import { useMemo, useState } from 'react';
import mock from '../mock/mock.js';
import { formatter } from '../utils/formatter.js';
import { capitalStr } from '../utils/capitalStr.js';

const FilterableList = () => {
  const [filtersBtn] = useState(['all', ...new Set(mock.map((i) => i.company))]);
  const [activeFilter, setActiveFilter] = useState(filtersBtn[0]);
  const [products, setProducts] = useState(mock);
  const [query, setQuery] = useState('');

  // 🚀 METHODS: ===============================
  const filteredItems = useMemo(() => {
    return products.filter(item => {
      return item.company.toLowerCase().includes(query.toLowerCase())
        || item.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  const onFilter = btn => {
    setActiveFilter(btn);
    setProducts(btn === 'all' ? mock : mock.filter(({ company }) => company === btn));
  };

  // 🚀 RENDER: ================================
  return <div className='products'>
    <h1 className='title products__title'>Products Filter</h1>

    <div className='container'>
      <div className='products__filter'>
        <h3 className='h5'>Search</h3>
        <input type='text' placeholder='Search' value={query} onChange={({ target: { value } }) => setQuery(value)} />

        <h3 className='h5'>Company</h3>
        <ul className='products__buttons'>
          {filtersBtn.map((btn, idx) =>
            <li key={idx}>
              <button className={`button ${activeFilter === btn ? 'button--primary' : ''}`}
                      onClick={() => onFilter(btn)}>
                {capitalStr(btn)}
              </button>
            </li>,
          )}
        </ul>
      </div>

      <ul className='products__list'>
        {filteredItems.map(({ id, title, company, image, price }) =>
          <li className='products__item' key={id}>
            <div className='products__item-header'>
              <img src={image} alt={title} />
            </div>
            <div className='products__item-body'>
              <h3 className='h6'>{title} ({company})</h3>
              <p className='button button--green'>{formatter.format(price)}</p>
            </div>
          </li>,
        )}
        {filteredItems.length === 0 && <h3 className='h4'>No products found</h3>}
      </ul>
    </div>
  </div>;
};

export default FilterableList;
