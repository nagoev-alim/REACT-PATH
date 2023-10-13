import { useState } from 'react';
import * as React from 'react';

interface IBoxProps {
  children: React.ReactNode;
}

/**
 * Компонент для создания раскрывающегося блока с содержанием.
 *
 * @param {object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы блока.
 */
const Box = ({ children }: IBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  /**
   * Обработчик переключения видимости блока.
   */
  function handleToggle() {
    setIsOpen(v => !v);
  }

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={handleToggle}>{isOpen ? '–' : '+'}</button>
      {isOpen && children}
    </div>
  );
};

export default Box;
