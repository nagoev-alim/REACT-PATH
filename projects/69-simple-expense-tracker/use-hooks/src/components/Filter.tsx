import { categories } from '../utils/constants.ts';

/**
 * Свойства компонента Filter.
 * @interface IFilterProps
 * @property {Function} onSelectCategory - Функция обратного вызова, вызываемая при выборе категории.
 */
interface IFilterProps {
  onSelectCategory: (category: string) => void;
}

/**
 * Компонент для фильтрации по категории.
 * @function
 * @name Filter
 * @param {IFilterProps} props - Свойства компонента Filter.
 */
const Filter = ({ onSelectCategory }: IFilterProps) => {
  return (
    <select className='input' onChange={({ target: { value } }) => onSelectCategory(value)}>
      <option value=''>All categories</option>
      {categories.map(category => <option key={category} value={category}>{category}</option>)}
    </select>
  );
};

export default Filter;