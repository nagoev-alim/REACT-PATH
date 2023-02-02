import { Link } from 'react-router-dom';
import { ADD_FAVORITE, REMOVE_FROM_FAVORITE } from '../../context/constant.js';
import { useAppHook } from '../../context/AppContext.jsx';

// 🚀 BOOK: ================================
const Book = ({ book, isHome }) => {
  const { dispatch, favorite } = useAppHook();

  // 🚀 METHODS: ================================
  const onAdd = (payload, target) => {
    target.disabled = true;
    localStorage.setItem('favoriteBooks', JSON.stringify([...favorite, payload]));
    dispatch({
      type: ADD_FAVORITE,
      payload,
    });
  };

  const onRemove = (payload) => {
    dispatch({
      type: REMOVE_FROM_FAVORITE,
      payload
    })
  }

  // 🚀 RENDER: ================================
  return <li className='bookhub__item'>
    <div className='bookhub__item-header'>
      {isHome
        ? <Link to={`/detail/${book.id}`}>
          <img src={book.cover_id} alt={book.title} />
        </Link>
        : <img src={book.cover_id} alt={book.title} />
      }
    </div>
    <div className='bookhub__item-body'>
      <h3 className='h6'>
        {isHome
          ? <Link to={`/detail/${book.id}`}>{book.title}</Link>
          : book.title
        }
      </h3>
      <p>
        <span className='h6'>Author:</span>
        {book.author && book.author.map((name, idx) => <span key={idx}>{name}</span>)}
      </p>
      <p><span className='h6'>Total Editions:</span> <span>{book.edition_count}</span></p>
      <p><span className='h6'>First Publish Year:</span> <span>{book.first_publish_year}</span></p>
      <button
        className='button button--primary button--fluid'
        disabled={isHome && favorite.find(item => item.id === book.id)}
        onClick={({ target }) => isHome ? onAdd(book, target) : onRemove(book.id)}
      >{isHome ? 'Add to Favorite' : 'Remove from Favorite'}
      </button>
    </div>
  </li>;
};

export default Book;
