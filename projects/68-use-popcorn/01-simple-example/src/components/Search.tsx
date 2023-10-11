import { ChangeEvent, useRef } from 'react';
import useKey from '../hooks/useKey';

interface ISearchProps {
  query: string;
  setQuery: (record: string) => void;
}

/**
 * Компонент для поиска фильмов.
 *
 * @component
 * @param {object} props - Свойства компонента.
 * @param {string} props.query - Текущий запрос для поиска фильмов.
 * @param {function} props.setQuery - Функция для установки значения запроса.
 * @returns {JSX.Element}
 */
const Search = ({ query, setQuery }: ISearchProps) => {
  const inputRef = useRef(null);
  /**
   * Обработчик нажатия клавиши "Enter". Если текущий элемент, на котором установлен фокус, не является полем ввода,
   * то устанавливает фокус на поле ввода и очищает запрос.
   */
  useKey('Enter', function() {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery('');
  });

  /**
   * Обработчик изменения значения в поле ввода запроса.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения в поле ввода.
   */
  function handleQuery(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQuery(value);
  }

  return (
    <input
      ref={inputRef}
      type='text'
      value={query}
      className='search'
      placeholder='Search movies...'
      onChange={handleQuery}
    />
  );
};
export default Search;
