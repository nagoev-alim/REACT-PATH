import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';
import { Loader, Error } from '../components';

/**
 * Отображает главную страницу приложения, позволяя пользователю искать пользователей.
 * @returns {JSX.Element} JSX-элемент, представляющий главную страницу.
 */
const Home = () => {
  const [searchBtn, setSearchBtn] = useState<string>('Search');
  const { users, isLoading, isError, searchUsers, dispatch } = useAppContext();

  /**
   * Обрабатывает событие отправки формы поиска пользователей.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>} Promise, представляющий результат обработки события.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    try {
      dispatch({ type: TYPES.CLEAR_USERS });
      dispatch({ type: TYPES.SET_LOADING, payload: true });
      setSearchBtn('Searching...');
      dispatch({ type: TYPES.FETCH_USERS, payload: await searchUsers(query) });
      dispatch({ type: TYPES.SET_LOADING, payload: false });
      setSearchBtn('Search');
    } catch (e) {
      dispatch({ type: TYPES.SET_ERROR, payload: true });
      dispatch({ type: TYPES.CLEAR_USERS });
      setSearchBtn('Search');
      console.log(e);
    }
    form.reset();
  }

  return (
    <div className='mx-auto max-w-4xl w-full mt-4 grid items-start gap-3'>
      <form className='p-3 bg-white border-2 rounded grid gap-2' onSubmit={handleSubmit}>
        <input className='input' type='text' name='query' placeholder='Search' />
        <button className='btn' type='submit' disabled={isLoading}>
          {searchBtn}
        </button>
        {users.length !== 0 && (
          <button className='btn' type='submit' onClick={() => dispatch({ type: TYPES.CLEAR_USERS })}>
            Clear
          </button>
        )}
      </form>

      {isLoading && <Loader />}

      {isError && <Error />}

      {users.length !== 0 && (
        <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
          {users.map(({ id, avatar_url, login }) =>
            <li className='bg-white border-2 rounded p-2 grid gap-2' key={id}>
              <img className='rounded' src={avatar_url} alt={login} />
              <h3 className='font-bold uppercase text-center'>{login}</h3>
              <Link className='btn' to={`/single/${login}`}>View Detail</Link>
            </li>,
          )}
        </ul>
      )}
    </div>
  );
};

export default Home;
