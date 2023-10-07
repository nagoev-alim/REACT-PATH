import { useAppContext } from '../context/AppContext.tsx';
import { Loader, Error } from './index';

/**
 * Компонент для отображения списка веб-API в выбранной категории.
 * @function
 * @name List
 * @description Этот компонент предназначен для отображения списка веб-API в выбранной категории, включая их основные характеристики.
 */
const List = () => {
  const { category, loading, error } = useAppContext();

  if (loading) return <Loader />;

  if (error) return <Error />;

  return (
    !loading && category && (
      <section className='grid gap-2'>
        <h2 className='text-lg text-center font-medium'>List API ({category.count})</h2>
        <ul className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 items-start'>
          {category.entries.map((item, idx) =>
            <li className='bg-white p-3 border-2 rounded' key={idx}>
              <a href={item.Link} target='_blank'>
                {['API', 'Description', 'Auth', 'Cors', 'Category']
                  .map((key, keyIdx) =>
                    <p className='flex gap-1 flex-wrap' key={keyIdx}>
                      <span className='font-bold'>{keyIdx === 0 ? 'Title' : key}:</span>
                      <span>{item[key] === '' ? '-' : item[key]}</span>
                    </p>,
                  )}
              </a>
            </li>,
          )}
        </ul>
      </section>
    )
  );
};

export default List;
