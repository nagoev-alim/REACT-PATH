import { ChangeEvent, useState } from 'react';
import { useAppContext } from '../context/AppContext.tsx';
import { actionHandlers } from '../context/AppActions.tsx';

interface ISelectProps {
  label: string;
  options: { id: string, name: string }[];
  name: string;
}

/**
 * Компонент выпадающего списка для выбора параметров.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} props.label - Название параметра, отображаемое как метка.
 * @param {Object[]} props.options - Массив объектов параметров для выбора.
 * @param {string} props.options.id - Идентификатор параметра.
 * @param {string} props.options.name - Отображаемое имя параметра.
 * @param {string} props.name - Уникальное имя компонента.
 * @returns {JSX.Element} React-элемент выпадающего списка.
 */
const Select = ({ label, options, name }: ISelectProps) => {
  const [value, setValue] = useState<string>('');
  const { dispatch } = useAppContext();

  /**
   * Обработчик изменения выбора параметра.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения значения выпадающего списка.
   */
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setValue(value);
    switch (label) {
      case 'Category':
        dispatch(actionHandlers.category(value));
        break;
      case 'Difficulty':
        dispatch(actionHandlers.difficulty(value));
        break;
      case 'Type':
        dispatch(actionHandlers.type(value));
        break;
      default:
        break;
    }
  }

  return (
    <select className='input' name={name} value={value} onChange={handleChange}>
      <option value=''>Select {label}</option>
      {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
    </select>
  );
};

export default Select;
