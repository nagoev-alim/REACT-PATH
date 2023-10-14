import { Link } from 'react-router-dom';

/**
 * Компонент "Страница не найдена".
 * @component
 */
const NotFound = () => {
  return (
    <div className='grid place-items-center gap-3'>
      <h1 className='text-3xl font-bold'>Page not found</h1>
      <Link to='/' className='btn dark:bg-slate-600'>Back to Home</Link>
    </div>
  );
};

export default NotFound;
