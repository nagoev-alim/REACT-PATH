import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import { Book } from '../components';
import { IBook } from '../types';

/**
 * Компонент Favorites представляет страницу "Избранное", отображая список избранных книг.
 * @component
 */
const Favorites = () => {
  const { favorite } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className='grid gap-2 my-4 mx-auto max-w-4xl w-full'>
      <button className='btn' type='button' onClick={() => navigate('/')}>
        Go Back
      </button>
      {favorite.length === 0 && <h2 className='text-center text-3xl font-bold'>Favorites is empty</h2>}
      {favorite.length > 0 && (
        <ul className='grid items-start gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {favorite.map((book: IBook) => <Book key={book.id} book={book} />)}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
