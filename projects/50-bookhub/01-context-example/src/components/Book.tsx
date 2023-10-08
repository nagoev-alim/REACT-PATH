import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';
import { Link } from 'react-router-dom';
import { IBook } from '../types';

interface IBookProps {
  book: IBook;
  isHome?: boolean;
}

/**
 * Компонент Book представляет информацию о книге и действия, связанные с добавлением и удалением из избранного.
 * @component
 * @param {IBookProps} props - Свойства компонента Book.
 * @param {IBook} props.book - Информация о книге.
 * @param {boolean} props.isHome - Флаг, указывающий, находится ли компонент на главной странице.
 */
const Book = ({ book, isHome = false }: IBookProps) => {
  const { dispatch, favorite } = useAppContext();

  /**
   * Обрабатывает действие добавления книги в избранное.
   * @param {IBook} payload - Информация о добавляемой книге.
   * @param {Object} target - HTML-элемент, вызвавший событие.
   */
  function handleAdd(payload: IBook, target): void {
    target.disabled = true;
    localStorage.setItem('favoriteBooks', JSON.stringify([...favorite, payload]));
    dispatch({ type: TYPES.ADD_FAVORITE, payload });
  }

  /**
   * Обрабатывает действие удаления книги из избранного.
   * @param {string} payload - Идентификатор удаляемой книги.
   */
  function handleRemove(payload: string): void {
    dispatch({ type: TYPES.REMOVE_FROM_FAVORITE, payload });
    localStorage.setItem('favoriteBooks', JSON.stringify(favorite.filter(item => item.id !== payload)));
  }

  return (
    <li className='bg-white p-2 border-2 rounded grid gap-2 text-sm'>
      {isHome
        ? (
          <Link to={`detail/${book.id}`}>
            <img className='rounded min-h-[295px] max-h-[295px] w-full object-cover' src={book.cover_id}
                 alt={book.title} />
          </Link>
        )
        :
        <img className='rounded min-h-[295px] max-h-[295px] w-full object-cover' src={book.cover_id} alt={book.title} />
      }
      <div className='grid gap-1.5'>
        <h3 className='font-bold'>
          {isHome ? <Link to={`/detail/${book.id}`}>{book.title}</Link> : book.title}
        </h3>
        <p className='flex flex-wrap gap-1'>
          <span className='font-bold'>Author:</span>
          {book.author && book.author.map((name, idx) => <span key={idx}>{name}</span>)}
        </p>
        <p className='flex flex-wrap gap-1'><span className='font-bold'>Total Editions:</span>
          <span>{book.edition_count}</span></p>
        <p className='flex flex-wrap gap-1'><span className='font-bold'>First Publish Year:</span>
          <span>{book.first_publish_year}</span></p>
        <button
          className='btn'
          disabled={isHome && favorite.find((item: IBook) => item.id === book.id)}
          onClick={({ target }) => isHome ? handleAdd(book, target) : handleRemove(book.id)}
        >
          {isHome ? 'Add to Favorite' : 'Remove from Favorite'}
        </button>
      </div>
    </li>
  );
};

export default Book;
