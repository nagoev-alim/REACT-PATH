import { Link, NavLink } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';

/**
 * Функциональный компонент, представляющий верхний навигационный блок на веб-странице.
 *
 * @returns {JSX.Element} JSX элемент, представляющий верхний блок навигации.
 */
const Header = () => {
  return (
    <header className='bg-white border-b-2 p-3 md:py-4'>
      <nav className='max-w-4xl w-full mx-auto grid place-items-center sm:flex sm:flex-wrap sm:justify-between'>
        <Link className='flex gap-1 items-center font-bold' to='/'>
          <FiGithub size={20} />
          GitHubFinder
        </Link>
        <ul className='flex flex-wrap items-center gap-2'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='about'>About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
