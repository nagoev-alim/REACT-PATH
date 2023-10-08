import { Link } from 'react-router-dom';
/**
 * React-компонент для страницы "404 - Страница не найдена".
 * @function
 * @name NotFound
 */
const NotFound = () => {
  return (
    <div className='grid place-items-center gap-2'>
      <h3 className='text-2xl text-center'>Page Not Found</h3>
      <Link className='btn' to='/'>Back</Link>
    </div>
  );
};

export default NotFound;
