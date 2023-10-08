import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppContext } from '../context/AppContext.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader, Error, Book } from '../components';
import { BASE_URL, TYPES } from '../utils/constants.ts';
import coverImg from '/images/cover.jpg';

/**
 * Компонент Home представляет главную страницу приложения для поиска книг.
 * @component
 */
const Home = () => {
  const { dispatch, books, isLoading, isError } = useAppContext();
  const [query, setQuery] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  /**
   * Обрабатывает отправку формы поиска книг.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>} Promise, представляющий результат обработки события.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      setTitle('');
      return;
    }
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    dispatch({ type: TYPES.FETCH_BOOKS, payload: [] });
    dispatch({ type: TYPES.IS_ERROR, payload: false });
    try {
      const { data: { docs } } = await axios.get(`${BASE_URL}${query}`);
      const newBooks = docs.slice(0, 20).map((bookSingle) => (
        {
          id: bookSingle.key.replace('/works/', ''),
          author: bookSingle.author_name,
          cover_id: bookSingle.cover_i ? `https://covers.openlibrary.org/b/id/${bookSingle.cover_i}-L.jpg` : coverImg,
          edition_count: bookSingle.edition_count,
          first_publish_year: bookSingle.first_publish_year,
          title: bookSingle.title,
        }
      ));
      dispatch({ type: TYPES.FETCH_BOOKS, payload: newBooks });
      dispatch({ type: TYPES.IS_LOADING, payload: false });
      setTitle(docs.length !== 0 ? 'Your Search Result' : 'No Search Result Found!');
    } catch (e) {
      console.log(e);
      dispatch({ type: TYPES.IS_LOADING, payload: false });
      dispatch({ type: TYPES.FETCH_BOOKS, payload: [] });
      dispatch({ type: TYPES.IS_ERROR, payload: true });
      setTitle('');
    }

    setQuery('');
  }

  /**
   * Обрабатывает изменение значения в поле ввода поиска.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения поля ввода.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  return (
    <div className='my-4 grid gap-3 max-w-4xl w-full mx-auto'>
      <form className='grid gap-2 p-2 border-2 rounded bg-white' onSubmit={handleSubmit}>
        <h2 className='font-bold'>Find your Book Of Choice</h2>
        <input className='input' type='text' name='query' placeholder='Enter search query' value={query}
               onChange={handleChange} />
        <button className='btn' type='submit'>Search</button>
      </form>
      {isError && <Error />}
      {isLoading && <Loader />}
      {title.length !== 0 && <h2 className='text-center font-bold text-3xl'>{title}</h2>}
      {books.length > 0 && (
        <ul className='grid items-start gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {books.map(book => <Book key={book.id} book={book} isHome />)}
        </ul>
      )}
    </div>
  );
};

export default Home;
