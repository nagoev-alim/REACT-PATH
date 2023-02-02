import { useAppHook } from '../../context/AppContext.jsx';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const { favorite } = useAppHook();
  // 🚀 RENDER: ================================
  return <header className='bookhub__header'>
    <div className='bookhub__container'>
      <h1 className='bookhub__title h3'>
        <Link to='/'>BookHub</Link>
      </h1>
      <nav className='bookhub__nav'>
        <ul className='bookhub__list'>
          <li className='bookhub__list-item'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='bookhub__list-item'>
            <NavLink to='/about'>About</NavLink>
          </li>
          {favorite.length !== 0 && <li className='bookhub__list-item'>
            <NavLink to='/favorites'>Favorites</NavLink>
          </li>}
        </ul>
      </nav>
    </div>
  </header>;
};

export default Header;
