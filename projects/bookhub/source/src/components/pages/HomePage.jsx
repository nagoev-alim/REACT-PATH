import toast from 'react-hot-toast';
import { useAppHook } from '../../context/AppContext.jsx';
import axios from 'axios';
import { BASE_URL, FETCH_BOOKS, IS_ERROR, IS_LOADING } from '../../context/constant.js';
import coverImg from '../../assets/images/cover.jpg';
import { useState } from 'react';
import { Book, Error, Loading } from '../index.js';

// 🚀 HOME PAGE: ================================
const HomePage = () => {
  const { dispatch, books, isLoading, isError } = useAppHook();
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');

  // 🚀 METHODS: ================================
  const onSubmit = async (event) => {
    event.preventDefault();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      setTitle('');
      return;
    }
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: FETCH_BOOKS, payload: [] });
    dispatch({ type: IS_ERROR, payload: false });
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
      dispatch({
        type: FETCH_BOOKS,
        payload: newBooks,
      });
      dispatch({ type: IS_LOADING, payload: false });
      setTitle(docs.length !== 0 ? 'Your Search Result' : 'No Search Result Found!');
    } catch (e) {
      console.log(e);
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: FETCH_BOOKS, payload: [] });
      dispatch({ type: IS_ERROR, payload: true });
      setTitle('');
    }

    setQuery('');
  };

  // 🚀 RENDER: ================================
  return <>
    <form className='bookhub__form' onSubmit={onSubmit}>
      <h2 className='h6 bookhub__form-title'>Find your Book Of Choice</h2>
      <input type='text' name='query' placeholder='Enter search query' value={query}
             onChange={({ target: { value } }) => setQuery(value)} />
      <button className='button button--primary' type='submit'>Search</button>
    </form>
    {isError && <Error />}
    {isLoading && <Loading />}
    {title.length !== 0 && <h2 className='h4 bookhub__search-title'>{title}</h2>}
    {books.length > 0 && <ul className='bookhub__results'>{books.map(book => <Book key={book.id} book={book} isHome />)}</ul>}
  </>;
};

export default HomePage;
