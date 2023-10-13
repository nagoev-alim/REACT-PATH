import * as React from 'react';

interface IMainProps {
  children: React.ReactNode;
}

/**
 * Компонент главной части страницы.
 *
 * @component
 * @param {object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @returns {JSX.Element}
 */
const Main = ({ children }: IMainProps) => {
  return (
    <main className='main'>{children}</main>
  );
};

export default Main;
