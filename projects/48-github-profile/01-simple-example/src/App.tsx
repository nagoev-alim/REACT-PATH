import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { LineWobble } from '@uiball/loaders';
import { FiEye, FiGitMerge, FiStar } from 'react-icons/fi';


interface Repos {
  html_url: string;
  name: string;
  stargazers_count: string;
  watchers_count: string;
  forks_count: string;
}

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  followers: string;
  following: string;
  public_repos: string;
  public_gists: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние, содержащее информацию о пользователе GitHub.
   *
   * @type {User | null}
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Состояние, содержащее информацию о репозиториях пользователя GitHub.
   *
   * @type {Repos[] | []}
   */
  const [repos, setRepos] = useState<Repos[] | []>([]);

  /**
   * Состояние для отслеживания состояния загрузки.
   *
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Функция для обработки отправки формы и запроса информации о пользователе и его репозиториях.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    try {
      setIsLoading(true);
      const [user, repos] = await Promise.all([
        axios.get<User>(`https://api.github.com/users/${query}`),
        axios.get<Repos[]>(`https://api.github.com/users/${query}/repos?sort=created&per_page=10`),
      ]);
      console.log({ user, repos });
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
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-2xl w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Github Profile</h1>
      <form className='grid gap-2' onSubmit={handleSubmit}>
        <input className='input' type='text' name='query' placeholder='Enter username' />
        <button className='btn' type='submit'>Submit</button>
      </form>
      {isLoading && (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )}
      {user && (
        <div className='grid gap-3 place-items-center text-center'>
          <h3 className='font-bold text-lg'>About <span>{user.login}</span></h3>
          <img className='w-[200px] rounded-full' src={user.avatar_url} alt={user.login} />
          <a className='btn' href={user.html_url} target='_blank'>View Profile</a>
          {user.bio && <div>{user.bio}</div>}
          <ul className='flex flex-wrap justify-center items-center gap-2'>
            <li className='btn'>Followers: {user.followers}</li>
            <li className='btn'>Following: {user.following}</li>
            <li className='btn'>Public Repos: {user.public_repos}</li>
            <li className='btn'>Public Gists: {user.public_gists}</li>
          </ul>
        </div>
      )}
      {repos.length !== 0 && (
        <div className='grid gap-3'>
          <h3 className='font-bold text-lg'>Latest Repos:</h3>
          <ul className='grid gap-3'>
            {repos.map(({ html_url, name, stargazers_count, watchers_count, forks_count }, idx) =>
              <li className='bg-white border-2 rounded p-3' key={idx}>
                <a className='grid gap-2' target='_blank' href={html_url}>
                  <h4 className='font-bold'>{name}</h4>
                  <div className='flex flex-wrap items-center gap-2 w-full'>
                    <div className='flex items-center gap-1.5'>
                      <FiStar />
                      {stargazers_count} stars
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <FiEye />
                      {watchers_count} watchers
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <FiGitMerge />
                      {forks_count} forks
                    </div>
                  </div>
                </a>
              </li>)}
          </ul>
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
