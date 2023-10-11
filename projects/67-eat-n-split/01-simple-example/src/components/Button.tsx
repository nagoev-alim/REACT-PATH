import * as React from 'react';
/**
 * Пропсы для компонента Button.
 * @interface IButtonProps
 * @property {React.ReactNode} children - Дочерние элементы кнопки.
 * @property {function} onClick - Функция-обработчик клика на кнопке.
 */
interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
/**
 * React-компонент для кнопки.
 * @param {IButtonProps} props - Пропсы компонента.
 */
const Button = ({ children, onClick }: IButtonProps) => {
  return (
    <button className='button' onClick={onClick}>{children}</button>
  );
};

export default Button;