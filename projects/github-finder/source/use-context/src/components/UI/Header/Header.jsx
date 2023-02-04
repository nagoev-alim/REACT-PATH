import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import mock from './Header.mock.js';
import { FiGithub } from 'react-icons/fi';

const Header = () => (
  <header className={classes.header}>
    <nav className={classes.nav}>
      <Link className={classes.logo} to={mock.logo.href}>
        <FiGithub size={20} />
        {mock.logo.label}
      </Link>
      <ul className={classes.menu}>
        {mock.menu.map((i, idx) =>
          <li key={idx}>
            <NavLink to={i.href}>{i.label}</NavLink>
          </li>,
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
