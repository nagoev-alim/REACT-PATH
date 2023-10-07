import { useAppContext } from '../context/AppContext.tsx';
import { Loader, Error } from './index';

/**
 * Компонент для отображения категорий веб-API.
 * @function
 * @name Categories
 * @description Этот компонент предназначен для отображения списка категорий веб-API и обеспечивает возможность выбора категории.
 */
const Categories = () => {
  const { categories, activeCategory, loading, error, fetchCategory } = useAppContext();

  /**
   * Обработчик клика по категории для загрузки соответствующих API.
   *
   * @param {string} item - Название выбранной категории.
   * @returns {Promise<void>} - Обещание, представляющее завершение операции.
   */
  async function handleClick(item: string): Promise<void> {
    await fetchCategory(item);
  }

  if (loading) return <Loader />;

  if (error) return <Error />;

  return (
    !loading && categories && (
      <section className='grid gap-2'>
        <h2 className='text-lg text-center font-medium'>Categories ({categories.count})</h2>
        <ul className='flex flex-wrap gap-2 items-center justify-center'>
          {categories.categories.map(item =>
            <li key={item.toLowerCase()}>
              <button className={`btn ${item === activeCategory ? 'bg-neutral-500 text-white hover:bg-neutral-500' : ''}`}
                      onClick={() => handleClick(item)}>
                {item}
              </button>
            </li>,
          )}
        </ul>
      </section>
    )
  );
};

export default Categories;
