import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import mock from './mock';
import { capitalStr } from './utils/capitalStr';
import { formatter } from './utils/formatter';

/**
 * Интерфейс для описания продукта.
 * @interface
 */
interface Product {
  id: number;      // Уникальный идентификатор продукта.
  title: string;   // Название продукта.
  category: string;  // Категория продукта.
  price: number;   // Цена продукта.
  img: string;     // Ссылка на изображение продукта.
  desc: string;    // Описание продукта.
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Products Filter".
 */
const App = () => {
  /**
   * @type {string[]} filtersBtn - Массив кнопок для фильтрации продуктов.
   */
  const [filtersBtn] = useState<string[]>(() => {
    return ['all', ...new Set(mock.map((i) => i.category))];
  });

  /**
   * @type {string} activeFilter - Активный фильтр для отображения продуктов.
   */
  const [activeFilter, setActiveFilter] = useState<string>(filtersBtn[0]);

  /**
   * @type {Product[]} products - Массив продуктов, отображаемых на странице.
   */
  const [products, setProducts] = useState<Product[]>(mock);

  /**
   * Функция для обработки события фильтрации продуктов.
   * @param {string} label - Метка фильтра.
   */
  function handleFilter(label: string): void {
    setActiveFilter(label);
    setProducts(label === 'all' ? mock : mock.filter(({ category }) => category === label));
  }

  return (
    <div className='max-w-4xl mx-auto w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Products Filter</h1>
      <ul className='flex flex-wrap justify-center gap-2'>
        {filtersBtn.map((btn, idx) =>
          <li className='' key={idx}>
            <button className={`btn ${activeFilter === btn ? 'bg-neutral-500 text-white hover:bg-neutral-600' : ''}`}
                    onClick={() => handleFilter(btn)}>
              {capitalStr(btn)}
            </button>
          </li>,
        )}
      </ul>
      <ul className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {products.map(({ id, img, title, price, desc }) =>
          <li className='bg-white border-2 rounded overflow-hidden' key={id}>
            <div className=''>
              <img className='min-h-[185px] max-h-[185px] w-full object-cover' src={img} alt={title} />
            </div>
            <div className='p-2 grid place-items-center gap-2'>
              <h3 className='font-bold'>{title}</h3>
              <p className='font-bold'>{formatter.format(price)}</p>
              <p className='text-sm'>{desc}</p>
            </div>
          </li>,
        )}
      </ul>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
