import * as React from 'react';

interface INavBarProps {
  children: React.ReactNode;
}

/**
 * Компонент навигационной панели.
 *
 * @component
 * @param {object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @returns {JSX.Element}
 */
const NavBar = ({ children }: INavBarProps) => {
  return (
    <nav className='nav-bar'>{children}</nav>
  );
};

export default NavBar;
