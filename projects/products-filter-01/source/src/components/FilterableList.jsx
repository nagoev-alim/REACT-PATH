import { useState } from 'react';
import mock from '../mock/mock.js';
import { formatter } from '../utils/formatter.js';
import { capitalStr } from '../utils/capitalStr.js';

const FilterableList = () => {
  const [filtersBtn] = useState(['all', ...new Set(mock.map((i) => i.category))]);
  const [activeFilter, setActiveFilter] = useState(filtersBtn[0]);
  const [products, setProducts] = useState(mock);

  // 🚀 METHODS: ===============================
  const onFilter = btn => {
    setActiveFilter(btn);
    setProducts(btn === 'all' ? mock : mock.filter(({ category }) => category === btn));
  };

  // 🚀 RENDER: ================================
  return <div className='products'>
    <h1 className='title products__title'>Products Filter</h1>

    <ul className='products__buttons'>
      {filtersBtn.map((btn, idx) =>
        <li className='products__buttons-item' key={idx}>
          <button className={`button ${activeFilter === btn ? 'button--primary' : ''}`} onClick={() => onFilter(btn)}>
            {capitalStr(btn)}
          </button>
        </li>,
      )}
    </ul>

    <ul className='products__list'>
      {products.map(({ id, img, title, price, desc }) =>
        <li className='products__item' key={id}>
          <div className='products__item-header'>
            <img src={img} alt={title} />
          </div>
          <div className='products__item-body'>
            <h3 className='h4'>{title}</h3>
            <p>{formatter.format(price)}</p>
            <p>{desc}</p>
          </div>
        </li>,
      )}
    </ul>
  </div>;
};

export default FilterableList;
