import { ReactNode } from 'react';

/**
 * @interface {Object} Props - Свойства компонента Main.
 * @property {ReactNode} children - Дочерние элементы, которые будут отображены внутри компонента.
 */
interface Props {
  children: ReactNode;
}

/**
 * Компонент для отображения основной области контента.
 *
 * @param {Props} props - Объект, содержащий свойства компонента Main.
 * @returns {JSX.Element} Возвращает JSX-элемент основной области контента с дочерними элементами.
 */
const Main = ({ children }: Props) => {
  return (
    <main className='main'>
      {children}
    </main>
  );
};

export default Main;
