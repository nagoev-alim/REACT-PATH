import { ChangeEvent, useEffect, useState } from 'react';

interface IFilterProps {
  handleFilter: (search: string, region: string) => void;
}

/**
 * Фильтр для списка стран.
 *
 * @component
 * @param {IFilterProps} props - Свойства компонента.
 * @param {Function} props.handleFilter - Функция для фильтрации стран по строке запроса и региону.
 */
const Filter = ({ handleFilter }: IFilterProps) => {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  useEffect(() => {
    handleFilter(search, region);
  }, [search, region]);

  /**
   * Обработчик изменения строки запроса для поиска стран.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения ввода.
   */
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setSearch(value);
  }

  /**
   * Обработчик изменения выбранного региона.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения выбора в выпадающем списке.
   */
  function handleRegion(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setRegion(value);
  }

  return (
    <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-[250px_200px] md:justify-between'>
      <label>
        <input type='text' className='input dark:bg-slate-600 dark:border-slate-500'
               placeholder='Search for a country...' value={search}
               onChange={handleSearch} />
      </label>

      <label>
        <select className='input dark:bg-slate-600 dark:border-slate-500' defaultValue={region} onChange={handleRegion}>
          <option value=''>Select Region</option>
          {['Africa', 'America', 'Asia', 'Europe', 'Oceania'].map((region, idx) => (
            <option key={idx} value={region}>{region}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;
