import React, { FC } from 'react';

/**
 * Интерфейс для свойств компонента Modal.
 */
interface IModalProps {
  children: React.ReactNode; // Дочерние элементы, отображаемые в модальном окне.
  modalOpen: boolean; // Флаг, указывающий, открыто ли модальное окно.
  handleClick: () => void; // Функция-обработчик для закрытия модального окна.
}

/**
 * Компонент модального окна.
 *
 * @param {IModalProps} props - Свойства компонента Modal.
 * @returns {JSX.Element} React-элемент, представляющий модальное окно.
 */
const Modal: FC<IModalProps> = ({ children, modalOpen, handleClick }) => {
  return (
    <div
      className={`fixed bg-neutral-900/50 top-0 left-0 w-full h-full grid place-items-center p-3 ${modalOpen ? '' : 'hidden'}`}
      onClick={handleClick}>
      <div className='grid gap-2 bg-white max-w-lg w-full p-4 border rounded'
           onClick={(e: MouseEvent) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
