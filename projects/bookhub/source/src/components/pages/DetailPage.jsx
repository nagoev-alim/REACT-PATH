import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import coverImg from '../../assets/images/cover.jpg';
import { BASE_SINGLE_URL, FETCH_BOOK, IS_ERROR, IS_LOADING } from '../../context/constant.js';
import { useAppHook } from '../../context/AppContext.jsx';
import axios from 'axios';
import { Error, Loading } from '../index.js';

// 🚀 DETAIL PAGE: ================================
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, book, isLoading, isError } = useAppHook();

  useEffect(() => {
    (async () => {
      dispatch({ type: IS_LOADING, payload: true });
      dispatch({ type: FETCH_BOOK, payload: null });
      dispatch({ type: IS_ERROR, payload: false });
      try {
        const { data } = await axios.get(`${BASE_SINGLE_URL}${id}.json`);
        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          dispatch({
            type: FETCH_BOOK,
            payload: {
              title,
              coverImg: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
              description: description?.value ? description.value : description ? description : 'No description found',
              subject_places: subject_places ?? 'No subject places found',
              subject_times: subject_times ?? 'No subject times found',
              subjects: subjects ?? 'No subjects found',
            },
          });
        }
        dispatch({ type: IS_LOADING, payload: false });
      } catch (e) {
        console.log(e);
        dispatch({ type: IS_LOADING, payload: false });
        dispatch({ type: FETCH_BOOK, payload: null });
        dispatch({ type: IS_ERROR, payload: false });
      }
    })();
  }, [id]);

  // 🚀 RENDER: ================================
  return <>
    <button className='button button--primary' type='button' onClick={() => navigate('/')}>Go Back</button>
    {isError && <Error />}
    {isLoading && <Loading />}

    {book &&
      <div className='book-detail'>
        <h3>{book?.title}</h3>
        <div className='book-detail__body'>
          <img className='book-detail__image' src={book?.coverImg} alt={book?.title} />
          {book?.description && <div className='book-detail__row'>
            <p className='h5'>Description</p>
            {book?.description}
          </div>}
          {book?.subject_places && <div className='book-detail__row'>
            <p className='h5'>Subject Places</p>
            {book?.subject_places}
          </div>}
          {book?.subject_times && <div className='book-detail__row'>
            <p className='h5'>Subject Times</p>
            {book?.subject_times}
          </div>}
          {book?.subjects && <div className='book-detail__row book-detail__subjects'>
            <p className='h5'>Subjects</p>
            {Array.isArray(book?.subjects) && book?.subjects.length !== 0
              ? <ul>{book?.subjects.map((s, idx) => <span key={idx}>{s}</span>)}</ul>
              : book?.subjects
            }
          </div>}
        </div>
      </div>
    }
  </>;
};

export default DetailPage;
