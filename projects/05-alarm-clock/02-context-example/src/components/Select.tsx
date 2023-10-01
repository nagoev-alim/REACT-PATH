import React, { FC } from 'react';

/**
 * Интерфейс для свойств компонента Select.
 * @interface
 */
interface ISelectProps {
  label: string,
  name: string,
  value: string,
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  dataItems: string[]
}

/**
 * Компонент Select представляет собой выпадающий список.
 * @function
 * @param {ISelectProps} props - Свойства компонента Select.
 * @returns {JSX.Element} Возвращает JSX-элемент выпадающего списка.
 */
const Select: FC<ISelectProps> = ({ label, name, value, handleChange, dataItems }) => {
  return (
    <select name={name} value={value} onChange={handleChange} className='input'>
      <option value={label}>{label}</option>
      {dataItems.map((option: string) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
};

export default Select;
