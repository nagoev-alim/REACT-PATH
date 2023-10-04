import { LineWobble } from '@uiball/loaders';

interface IUsersProps {
  loading: boolean,
  users: {
    avatar_url: string;
    login: string;
    html_url: string;
    id: string;
  }[]
}

/**
 * Компонент для отображения списка пользователей.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.loading - Флаг загрузки данных.
 * @param {Array} props.users - Массив пользователей.
 * @param {string} props.users[].avatar_url - URL аватара пользователя.
 * @param {string} props.users[].login - Логин пользователя.
 * @param {string} props.users[].html_url - URL профиля пользователя.
 * @param {string} props.users[].id - Уникальный идентификатор пользователя.
 */
const Users = ({ loading, users }: IUsersProps) => {
  return (
    loading
      ? (
        <div className='grid place-items-center py-5'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )
      : (
        <ul className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto w-full'>
          {users.map(({ avatar_url, login, html_url, id }) =>
            <li className='bg-white border-2 rounded overflow-hidden' key={id}>
              <img className='w-full' src={avatar_url} alt={login} />
              <div className='p-3 grid place-items-center gap-3'>
                <h3 className='font-medium text-lg uppercase'>{login}</h3>
                <a className='btn bg-neutral-700 text-white hover:bg-neutral-500' href={html_url} target='_blank'>
                  View profile
                </a>
              </div>
            </li>,
          )}
        </ul>
      )
  );
};

export default Users;
