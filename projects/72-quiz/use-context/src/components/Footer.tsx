import { ReactNode } from 'react';

/**
 * @interface {Object} Props - Свойства компонента Footer.
 * @property {ReactNode} children - Дочерние элементы, которые будут отображены внутри компонента.
 */
interface Props {
  children: ReactNode;
}

/**
 * Компонент футера приложения.
 *
 * @param {Props} props - Объект, содержащий свойства компонента Footer.
 * @returns {JSX.Element} Возвращает JSX-элемент футера с дочерними элементами.
 */
const Footer = ({ children }: Props) => {
  return (
    <footer>{children}</footer>
  );
};

export default Footer;