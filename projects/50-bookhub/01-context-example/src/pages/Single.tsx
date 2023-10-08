import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_SINGLE_URL, TYPES } from '../utils/constants.ts';
import coverImg from '/images/cover.jpg';
import { Loader, Error } from '../components';

/**
 * Компонент Single представляет страницу с деталями о книге.
 * @component
 */
const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, book, isLoading, isError } = useAppContext();
  /**
   * Запрашивает данные о книге при монтировании компонента.
   */
  useEffect(() => {
    (async () => {
      dispatch({ type: TYPES.IS_LOADING, payload: true });
      dispatch({ type: TYPES.FETCH_BOOK, payload: null });
      dispatch({ type: TYPES.IS_ERROR, payload: false });
      try {
        const { data } = await axios.get(`${BASE_SINGLE_URL}${id}.json`);
        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          dispatch({
            type: TYPES.FETCH_BOOK,
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
        dispatch({ type: TYPES.IS_LOADING, payload: false });
      } catch (e) {
        console.log(e);
        dispatch({ type: TYPES.IS_LOADING, payload: false });
        dispatch({ type: TYPES.FETCH_BOOK, payload: null });
        dispatch({ type: TYPES.IS_ERROR, payload: false });
      }
    })();
  }, [id]);

  return (
    <div className='grid gap-3 my-4 mx-auto max-w-4xl w-full'>
      <button className='btn' type='button' onClick={() => navigate('/')}>Go Back</button>
      {isError && <Error />}
      {isLoading && <Loader />}

      {book && (
        <div className='grid gap-2'>
          <h3 className='text-2xl font-bold'>{book?.title}</h3>
          <div className='grid gap-2'>
            <img className='max-w-[300px] rounded' src={book?.coverImg} alt={book?.title} />
            {book?.description && <div className='book-detail__row'>
              <p className='font-bold'>Description</p>
              <div className='text-sm'>
                {book?.description}
              </div>
            </div>}
            {book?.subject_places && <div className='book-detail__row'>
              <p className='font-bold'>Subject Places</p>
              <ul className='list-disc list-inside'>
                {book?.subject_places.map(place => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>}
            {book?.subject_times && <div className='book-detail__row'>
              <p className='font-bold'>Subject Times</p>
              {book?.subject_times}
            </div>}
            {book?.subjects && <div className='book-detail__row book-detail__subjects'>
              <p className='font-bold'>Subjects</p>
              {Array.isArray(book?.subjects) && book?.subjects.length !== 0
                ? <ul className='list-disc list-inside'>{book?.subjects.map((s, idx) => <li key={idx}>{s}</li>)}</ul>
                : book?.subjects
              }
            </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Single;
