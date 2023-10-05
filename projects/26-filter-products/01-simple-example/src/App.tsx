import { Toaster } from 'react-hot-toast';
import { ChangeEvent, useMemo, useState } from 'react';
import mock from './mock';
import { formatter } from './utils/formatter.ts';
import { capitalStr } from './utils/capitalStr.ts';

/**
 * Интерфейс для описания продукта.
 * @interface
 */
interface Product {
  id: string;      // Уникальный идентификатор продукта.
  title: string;   // Название продукта.
  company: string;  // Компания-производитель.
  image: string;   // Ссылка на изображение продукта.
  price: number;   // Цена продукта.
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Products Filter".
 */
const App = () => {
  /**
   * @type {string[]} filtersBtn - Массив кнопок для фильтрации продуктов по компании.
   */
  const [filtersBtn] = useState<string[]>(() => {
    return ['all', ...new Set(mock.map((i) => i.company))];
  });

  /**
   * @type {string} activeFilter - Активный фильтр для отображения продуктов по компании.
   */
  const [activeFilter, setActiveFilter] = useState<string>(filtersBtn[0]);

  /**
   * @type {Product[]} products - Массив продуктов, отображаемых на странице.
   */
  const [products, setProducts] = useState<Product[]>(mock);

  /**
   * @type {string} query - Строка поиска продуктов.
   */
  const [query, setQuery] = useState<string>('');

  /**
   * @type {Product[]} filteredItems - Отфильтрованные продукты на основе активного фильтра и строки поиска.
   */
  const filteredItems = useMemo(() => {
    return products.filter(item => {
      return item.company.toLowerCase().includes(query.toLowerCase())
        || item.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [products, query]);

  /**
   * Функция для обработки события фильтрации продуктов по компании.
   * @param {string} label - Метка фильтра (компания).
   */
  function handleFilter(label: string): void {
    setActiveFilter(label);
    setProducts(label === 'all' ? mock : mock.filter(({ company }) => company === label));
  }

  /**
   * Функция для обработки изменения значения строки поиска.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения ввода.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  return (
    <div className='max-w-7xl mx-auto w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Products Filter</h1>
      <div className='grid items-start gap-3 md:grid-cols-[200px_1fr]'>
        <div className='bg-white border-2 rounded p-2 grid gap-2'>
          <h3 className='text-sm font-bold'>Search</h3>
          <input className='input' type='text' placeholder='Search' value={query} onChange={handleChange} />
          <h3 className='font-bold text-sm'>Company</h3>
          <ul className='grid gap-1'>
            {filtersBtn.map((btn, idx) =>
              <li key={idx}>
                <button
                  className={`btn w-full ${activeFilter === btn ? 'bg-neutral-500 text-white hover:bg-neutral-400' : ''}`}
                  onClick={() => handleFilter(btn)}>
                  {capitalStr(btn)}
                </button>
              </li>,
            )}
          </ul>
        </div>

        <div>
          <ul className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {filteredItems.map(({ id, title, company, image, price }) =>
              <li className='bg-white border-2 rounded overflow-hidden' key={id}>
                <div className='products__item-header'>
                  <img className='min-h-[190px] max-h-[190px] object-cover w-full' src={image} alt={title} />
                </div>
                <div className='p-2 grid place-items-center gap-2'>
                  <h3 className='font-bold'>{title} ({company})</h3>
                  <p className='btn'>{formatter.format(price)}</p>
                </div>
              </li>,
            )}
          </ul>
          {filteredItems.length === 0 && <h3 className='text-2xl font-bold text-center'>No products found</h3>}
        </div>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
