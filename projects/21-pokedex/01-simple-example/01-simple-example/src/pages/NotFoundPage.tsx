import { Link } from 'react-router-dom';

/**
 * Компонент страницы "Page Not Found" (Страница не найдена).
 * @component
 */
const NotFoundPage = () => {
  return (
    <div className='text-center grid place-items-center gap-3'>
      <h1 className='font-bold text-2xl md:text-4xl'>Page Not Found</h1>
      <Link className='btn' to='/'>Back</Link>
    </div>
  );
};

export default NotFoundPage;
