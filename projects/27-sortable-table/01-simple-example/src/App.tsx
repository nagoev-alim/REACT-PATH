import mock from './mock/mock.json';
import { useCallback, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

/**
 * Интерфейс для описания структуры данных о человеке.
 * @interface
 */
interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

/**
 * Функция для сортировки данных.
 * @function
 * @param {Object} options - Параметры сортировки.
 * @param {Person[]} options.tableData - Данные для сортировки.
 * @param {string} options.sortKey - Ключ для сортировки.
 * @param {boolean} options.reverse - Порядок сортировки (по умолчанию, по возрастанию).
 * @returns {Person[]} Отсортированные данные.
 */
const sortData = ({ tableData, sortKey, reverse }: { tableData: Person[], sortKey: string, reverse: boolean }) => {
  if (!sortKey) return tableData;
  const sortedData = mock.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
  return reverse ? sortedData.reverse() : sortedData;
};


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Sortable Table".
 */
const App = () => {
  const [sortKey, setSortKey] = useState<string>('last_name');
  const [sortOrder, setSortOrder] = useState<string>('ascn');
  const headers: { key: string, label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First name' },
    { key: 'last_name', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'ip_address', label: 'IP address' },
  ];
  /**
   * Функция для обработки сортировки данных и возврата отсортированного списка.
   * @function
   * @returns {Person[]} Отсортированные данные.
   */
  const handleSortedData = useCallback((): void => {
    return sortData({ tableData: mock, sortKey, reverse: sortOrder === 'desc' });
  }, [mock, sortKey, sortOrder]);

  /**
   * Функция для обработки изменения сортировки.
   * @function
   * @param {string} key - Ключ для сортировки.
   */
  function handleChangeSort(key): void {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
    setSortKey(key);
  }

  return (
    <div className='max-w-6xl mx-auto w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Sortable Table</h1>
      <div className='overflow-auto'>
        <div className=''>
          <div className='grid grid-cols-[70px_212px_212px_220px_180px_234px]'>
            {headers.map((row) =>
              <div className='border bg-neutral-500 text-white font-medium p-3' key={row.key}>
                <SortButton columnKey={row.key} onClick={() => handleChangeSort(row.key)} {...{ sortOrder, sortKey }}>
                  {row.label}
                </SortButton>
              </div>,
            )}
          </div>
        </div>

        <div className='table__body'>
          {handleSortedData().map(({ id, first_name, last_name, email, gender, ip_address }: Person) =>
            <div className='grid grid-cols-[70px_212px_212px_220px_180px_234px] text-sm' key={id}>
              <div className='bg-white p-3 border'>{id}</div>
              <div className='bg-white p-3 border'>{first_name}</div>
              <div className='bg-white p-3 border'>{last_name}</div>
              <div className='bg-white p-3 border break-all'>{email}</div>
              <div className='bg-white p-3 border'>{gender}</div>
              <div className='bg-white p-3 border'>{ip_address}</div>
            </div>,
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

/**
 * Интерфейс для описания свойств кнопки сортировки.
 * @interface
 */
interface ISortButtonProps {
  children: React.ReactNode;
  columnKey: string;
  onClick: () => void;
  sortKey: string;
  sortOrder: string;
}

/**
 * React-компонент кнопки сортировки.
 * @function
 * @param {ISortButtonProps} props - Свойства кнопки сортировки.
 */
const SortButton = ({ sortOrder, columnKey, sortKey, onClick, children }: ISortButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${sortKey === columnKey && sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button'}`}
    >
      {children}
      {sortKey === columnKey && sortOrder === 'desc' ? <FiChevronDown size={25} /> : <FiChevronUp size={25} />}
    </button>
  );
};
