import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import { useEffect } from 'react';
import { TYPES } from '../utils/constants.ts';
import { Loader, Error } from '../components';
import { FaCodepen, FaEye, FaInfo, FaLink, FaStar, FaStore, FaUserFriends, FaUsers, FaUtensils } from 'react-icons/fa';
/**
 * Отображает страницу с информацией о пользователе GitHub и его репозиториями.
 * @returns {JSX.Element} JSX-элемент, представляющий страницу с информацией о пользователе.
 */
const Single = () => {
  const { login: username } = useParams();
  const navigate = useNavigate();
  const { user, repos, isLoading, isError, getUserAndRepos, dispatch } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: TYPES.SET_LOADING, payload: true });
        dispatch({ type: TYPES.FETCH_USER_AND_REPOS, payload: await getUserAndRepos(username) });
        dispatch({ type: TYPES.SET_LOADING, payload: false });
      } catch (e) {
        dispatch({ type: TYPES.SET_ERROR, payload: true });
        console.log(e);
      }
    })();
  }, [username]);

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  return (
    <div className='max-w-4xl mx-auto w-full my-4 grid gap-4'>
      <button className='btn' onClick={() => navigate(-1)}>Back</button>
      {user && !isLoading && (
        <div className='grid gap-3'>
          <h3 className='text-lg font-bold'>About: {username}</h3>
          <div className='bg-white p-2 border-2 rounded'>
            <figure>
              <img className='max-w-[200px] rounded-full border-2 mx-auto'  src={user.avatar_url} alt={user.login} />
            </figure>
            <div className='grid place-items-center gap-2 text-center'>
              <p className='text-center'>{user.login}</p>
              <span className='btn'>{user.type}</span>
              {user.hireable && <span className='btn'>Hireable</span>}
              <p>{user.bio}</p>
              <div className='grid gap-1.5'>
                <a href={user.html_url} target='_blank' rel='noreferrer' className='btn max-w-max mx-auto'>
                  Visit Github Profile
                </a>
                {user.location && <p className='flex gap-1.5'><span className='font-bold'>Location:</span>{user.location}</p>}
                {user.blog && <p className='flex gap-1.5'>
                  <span className='font-bold'>Website:</span>
                  <a href={user.blog?.startsWith('http') ? user.blog : 'https://' + user.blog} target='_blank' rel='noreferrer'>
                    {user.blog?.startsWith('http') ? user.blog : 'https://' + user.blog}
                  </a>
                </p>}
                {user.twitter_username && <p className='flex gap-1.5'>
                  <span className='font-bold'>Twitter:</span>
                  <a href={`https://twitter.com/${user.twitter_username}`} target='_blank'
                     rel='noreferrer'>{user.twitter_username}</a>
                </p>}
              </div>
            </div>
          </div>
          <ul className='grid gap-2 sm:grid-cols-2 md:grid-cols-4 place-content-center'>
            {[{ label: 'Followers', value: user.followers, src: <FaUsers size={20} /> },
              { label: 'Following', value: user.following, src: <FaUserFriends size={20} /> },
              { label: 'Public Repos', value: user.public_repos, src: <FaCodepen size={20} /> },
              { label: 'Public Gists', value: user.public_gists, src: <FaStore size={20} /> },
            ].map((i, idx) => <li key={idx} className='flex items-center gap-1.5 btn'>{i.src}<span>{i.label}:</span><span>{i.value}</span></li>)}
          </ul>
          <h3 className='font-bold'>Latest Repositories</h3>
          <ul className='grid gap-2'>
            {repos.map(({ id, name, description, html_url, forks, open_issues, watchers_count, stargazers_count }) =>
              <li className='bg-white border-2 rounded p-2 grid gap-2' key={id}>
                <a className='flex items-center gap-1.5 font-bold text-pink-400' href={html_url}><FaLink /> {name}</a>
                <p className=''>{description}</p>
                <ul className='flex flex-wrap items-center gap-2'>
                  {[{ src: <FaEye />, value: watchers_count },
                    { src: <FaStar />, value: stargazers_count },
                    { src: <FaInfo />, value: open_issues },
                    { src: <FaUtensils />, value: forks }]
                    .map((i, idx) => <li className='flex items-center gap-1.5' key={idx}>{i.src} {i.value}</li>)}
                </ul>
              </li>,
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Single;
