import classes from './Home.module.css';
import { useAppHook } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { REDUCER } from '../../utils/constants/reducer.constants.js';
import { Link } from 'react-router-dom';
import { Error, Loader } from '../../components/index.js';
import { useState } from 'react';


const Home = () => {
  const [searchBtn, setSearchBtn] = useState('Search');
  const { users, isLoading, isError, searchUsers, dispatch } = useAppHook();

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).query.toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    try {
      dispatch({ type: REDUCER.CLEAR_USERS });
      dispatch({ type: REDUCER.SET_LOADING, payload: true });
      setSearchBtn('Searching...');
      dispatch({ type: REDUCER.FETCH_USERS, payload: await searchUsers(query) });
      dispatch({ type: REDUCER.SET_LOADING, payload: false });
      setSearchBtn('Search');
    } catch (e) {
      dispatch({ type: REDUCER.SET_ERROR, payload: true });
      dispatch({ type: REDUCER.CLEAR_USERS });
      setSearchBtn('Search');
      console.log(e);
    }
    form.reset();
  };

  return <div className={classes.home}>
    {/* Form */}
    <form className={`${classes.form} ${users.length !== 0 ? classes.clear : ''}`} onSubmit={onSubmit}>
      <input type='text' name='query' placeholder='Search' />
      <button
        className='button button--primary button--fluid'
        type='submit'
        disabled={isLoading}
      >{searchBtn}</button>
      {users.length !== 0 &&
        <button
          className='button button--red button--fluid'
          type='submit'
          onClick={() => dispatch({ type: REDUCER.CLEAR_USERS })}
        >Clear</button>}
    </form>

    {/* Loader */}
    {isLoading && <Loader />}

    {/* Error */}
    {isError && <Error />}

    {/* Users */}
    {users.length !== 0 && <ul className={classes.list}>
      {users.map(({ id, avatar_url, login }) =>
        <li key={id}>
          <img src={avatar_url} alt={login} />
          <h3 className='h6'>{login}</h3>
          <Link className='button button--primary button--fluid' to={`/single/${login}`}>View Detail</Link>
        </li>,
      )}
    </ul>}
  </div>;
};

export default Home;
