import { FiEye, FiGithub, FiGitMerge, FiStar } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { LineWobble } from '@uiball/loaders';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function submitHandler - Form submit handler
   * @param event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).query.trim();

    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }

    try {
      setIsLoading(true);

      const [user, repos] = await Promise.all([
        axios.get(`https://api.github.com/users/${query}`),
        axios.get(`https://api.github.com/users/${query}/repos?sort=created&per_page=10`),
      ]);

      const { login, html_url, avatar_url, followers, following, public_gists, public_repos, bio } = user.data;

      setUser({ login, html_url, avatar_url, followers, following, public_gists, public_repos, bio });
      setRepos(repos.data);

      setIsLoading(false);

    } catch (e) {
      toast.error('User not found');
      setIsLoading(false);
      setUser([]);
      setRepos([]);
      return;
    }

    form.reset();
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='github-finder'>
        <h1 className='title'>GitHub User Profile</h1>

        <div className='main'>
          <form onSubmit={onSubmit}>
            <label>
              <input type='text' name='query' placeholder='Enter username' />
            </label>
            <button className='button' type='submit'>Submit</button>
          </form>
        </div>

        {isLoading && <div className='loader'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>}

        {user.length !== 0 &&
          <div className='user-result'>
            <h3>About <span>{user.login}</span></h3>
            <div className='top'>
              <img src={user.avatar_url} alt={user.login} />
              <a className='button' href={user.html_url} target='_blank'>View Profile</a>
              {user.bio && <div>{user.bio}</div>}
              <ul>
                <li className='followers'>Followers: {user.followers}</li>
                <li className='following'>Following: {user.following}</li>
                <li className='repos'>Public Repos: {user.public_repos}</li>
                <li className='gists'>Public Gists: {user.public_gists}</li>
              </ul>
            </div>
          </div>
        }

        {repos.length !== 0 &&
          <div className='repos-result'>
            <h3>Latest Repos:</h3>
            <ul>
              {repos.map(({ html_url, name, stargazers_count, watchers_count, forks_count }, idx) =>
                <li key={idx}>
                  <a target='_blank' href={html_url}>
                    <h4>{name}</h4>
                    <div className='stats'>
                      <div>
                        <FiStar />
                        {stargazers_count} stars
                      </div>
                      <div>
                        <FiEye />
                        {watchers_count} watchers
                      </div>
                      <div>
                        <FiGitMerge />
                        {forks_count} forks
                      </div>
                    </div>
                  </a>
                </li>)}
            </ul>
          </div>
        }
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
