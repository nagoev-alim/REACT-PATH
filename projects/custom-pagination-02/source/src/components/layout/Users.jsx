import { LineWobble } from '@uiball/loaders';

const Users = ({ loading, users }) => (
  loading
    ? <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>
    : <ul className='users'>
      {users.map(({ avatar_url, login, html_url, id }) =>
        <li key={id}>
          <img src={avatar_url} alt={login} />
          <h3 className='h6'>{login}</h3>
          <a className='button button--fluid button--primary' href={html_url} target='_blank'>View profile</a>
        </li>,
      )}
    </ul>
);

export default Users;


