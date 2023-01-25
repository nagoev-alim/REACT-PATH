import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { capitalStr } from './utils/capitalStr.js';
import { formatter } from './utils/formatter.js';
import mock from './mock/mock.js';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [filtersBtn] = useState(['all', ...new Set(mock.map((i) => i.category))]);
  const [activeFilter, setActiveFilter] = useState(filtersBtn[0]);
  const [products, setProducts] = useState(mock);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onFilter - Filters products
   * @param btn
   */
  const onFilter = btn => {
    setActiveFilter(btn);
    setProducts(btn === 'all' ? mock : mock.filter(({ category }) => category === btn));
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='products'>
        <h1 className='title'>Products Filter</h1>
        <ul className='filter'>
          {filtersBtn.map((btn, idx) =>
            <li key={idx}>
              <button
                className={`button ${activeFilter === btn ? 'active' : ''}`}
                onClick={() => onFilter(btn)}
              >
                {capitalStr(btn)}
              </button>
            </li>,
          )}
        </ul>
        <ul className='list'>
          {products.map(({ id, img, title, price, desc }) =>
            <li key={id}>
              <div className='header'>
                <img src={img} alt={title} />
              </div>
              <div className='body'>
                <h4>{title}</h4>
                <p>{formatter.format(price)}</p>
                <p>{desc}</p>
              </div>
            </li>,
          )}
        </ul>
      </div>
    </div>

    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
