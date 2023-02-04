import classes from './Single.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppHook } from '../../context/AppContext.jsx';
import { Error, Loader } from '../../components/index.js';
import { useEffect } from 'react';
import { REDUCER } from '../../utils/constants/reducer.constants.js';
import { FaCodepen, FaEye, FaInfo, FaLink, FaStar, FaStore, FaUserFriends, FaUsers, FaUtensils } from 'react-icons/fa';


const Single = () => {
  const { login: username } = useParams();
  const navigate = useNavigate();
  const { user, repos, isLoading, isError, getUserAndRepos, dispatch } = useAppHook();

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: REDUCER.SET_LOADING, payload: true });
        dispatch({ type: REDUCER.FETCH_USER_AND_REPOS, payload: await getUserAndRepos(username) });
        dispatch({ type: REDUCER.SET_LOADING, payload: false });
      } catch (e) {
        dispatch({ type: REDUCER.SET_ERROR, payload: true });
        console.log(e);
      }
    })();
  }, [username]);

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  return <div className={classes.single}>
    {/* Back */}
    <button className='button button--primary' onClick={() => navigate(-1)}>Back</button>

    {/* Detail */}
    {user && !isLoading &&
      <div className={classes.container}>
        <h3 className='h4'>About: {name}</h3>
        {/* Top */}
        <div className='top'>
          {/* Avatar */}
          <figure>
            <img src={user.avatar_url} alt={user.login} />
          </figure>

          <div className='column'>
            {/* Name */}
            <h1 className='h3'>{name}</h1>
            {/* Login */}
            <p>{user.login}</p>
            <span className='button button--green'>{user.type}</span>
            {user.hireable && <span className='button button--blue'>Hireable</span>}
            {/* Bio */}
            <p>{user.bio}</p>

            {/* Links */}
            <div className='links'>
              <a href={user.html_url} target='_blank' rel='noreferrer' className='button button--red'>
                Visit Github Profile
              </a>
              {user.location && <p><span className='h6'>Location:</span>{user.location}</p>}
              {user.blog && <p>
                <span className='h6'>Website:</span>
                <a href={user.blog?.startsWith('http') ? user.blog : 'https://' + user.blog} target='_blank' rel='noreferrer'>
                  {user.blog?.startsWith('http') ? user.blog : 'https://' + user.blog}
                </a>
              </p>}
              {user.twitter_username && <p>
                <span className='h6'>Twitter:</span>
                <a href={`https://twitter.com/${user.twitter_username}`} target='_blank'
                   rel='noreferrer'>{user.twitter_username}</a>
              </p>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <ul className={classes.stats}>
          {[{ label: 'Followers', value: user.followers, src: <FaUsers size={20} /> },
            { label: 'Following', value: user.following, src: <FaUserFriends size={20} /> },
            { label: 'Public Repos', value: user.public_repos, src: <FaCodepen size={20} /> },
            { label: 'Public Gists', value: user.public_gists, src: <FaStore size={20} /> },
          ].map((i, idx) => <li key={idx} className='h6'>{i.src}<span>{i.label}:</span><span>{i.value}</span></li>)}
        </ul>

        <h3 className='h4'>Latest Repositories</h3>

        {/* Repos */}
        <ul className={classes.repos}>
          {repos.map(({ id, name, description, html_url, forks, open_issues, watchers_count, stargazers_count }) =>
            <li className={classes.repos_item} key={id}>
              <a className='link' href={html_url}><FaLink /> {name}</a>
              <p className='description'>{description}</p>
              <ul className='list'>
                {[{ src: <FaEye />, value: watchers_count },
                  { src: <FaStar />, value: stargazers_count },
                  { src: <FaInfo />, value: open_issues },
                  { src: <FaUtensils />, value: forks }]
                  .map((i, idx) => <li key={idx}>{i.src} {i.value}</li>)}
              </ul>
            </li>,
          )}
        </ul>
      </div>
    }
  </div>;
};

export default Single;
