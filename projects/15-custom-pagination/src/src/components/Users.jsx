/**
 * @function Users
 * @param loading
 * @param users
 * @return {JSX.Element}
 * @constructor
 */
const Users = ({ loading, users }) => (
  loading
    ? <p className='loading'>Loading...</p>
    : <ul className='users'>
      {users.map(({ avatar_url, login, html_url, id }) =>
        <li key={id}>
          <img src={avatar_url} alt={login} />
          <h3>{login}</h3>
          <a href={html_url} target='_blank'>View profile</a>
        </li>,
      )}
    </ul>
);

export default Users;
