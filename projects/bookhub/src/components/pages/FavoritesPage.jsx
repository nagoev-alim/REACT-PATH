import { useAppHook } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Book } from '../index.js';

// 🚀 FAVORITE PAGE: ================================
const FavoritesPage = () => {
  const { favorite } = useAppHook();
  const navigate = useNavigate();
  return <>
    <button className='button button--primary' type='button' onClick={() => navigate('/')}>Go Back</button>
    {favorite.length === 0 && <h2 className='h4 bookhub__search-title'>Favorites is empty</h2>}
    {favorite.length > 0 &&
      <ul className='bookhub__results'>
        {favorite.map(book => {
          return <Book key={book.bookId} book={book} />;
        })}
      </ul>}
  </>;
};

export default FavoritesPage;
