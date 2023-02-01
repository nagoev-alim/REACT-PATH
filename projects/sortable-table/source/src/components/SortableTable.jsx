import mock from '../../mock/mock.json';
import { useCallback, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/all';

const sortData = ({ tableData, sortKey, reverse }) => {
  if (!sortKey) return tableData;
  const sortedData = mock.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
  return reverse ? sortedData.reverse() : sortedData;
};

const SortButton = ({ sortOrder, columnKey, sortKey, onClick, children }) => (
  <button onClick={onClick}
          className={`${
            sortKey === columnKey && sortOrder === 'desc'
              ? 'sort-button sort-reverse'
              : 'sort-button'
          }`}
  >
    {children}
    {sortKey === columnKey && sortOrder === 'desc' ? <FiChevronDown size={25} /> : <FiChevronUp size={25} />}
  </button>
);


const SortableTable = () => {
  const [sortKey, setSortKey] = useState('last_name');
  const [sortOrder, setSortOrder] = useState('ascn');
  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First name' },
    { key: 'last_name', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'ip_address', label: 'IP address' },
  ];

  // 🚀 METHODS: ================================
  const sortedData = useCallback(() => sortData({
    tableData: mock,
    sortKey,
    reverse: sortOrder === 'desc',
  }), [mock, sortKey, sortOrder]);

  const changeSort = (key) => {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
    setSortKey(key);
  };

  // 🚀 RENDER: ================================
  return <div className='sortable'>
    <h1 className='title sortable__title'>Sortable Table</h1>
    <div className='table sortable__table'>
      <div className='table__header'>
        <div className='table__row'>
          {headers.map((row) =>
            <div className='table__cell' key={row.key}>
              <SortButton columnKey={row.key} onClick={() => changeSort(row.key)} {...{ sortOrder, sortKey }}>
                {row.label}
              </SortButton>
            </div>,
          )}
        </div>
      </div>

      <div className='table__body'>
        {sortedData().map(({ id, first_name, last_name, email, gender, ip_address }) =>
          <div className='table__row' key={id}>
            <div className='table__cell'>{id}</div>
            <div className='table__cell'>{first_name}</div>
            <div className='table__cell'>{last_name}</div>
            <div className='table__cell'>{email}</div>
            <div className='table__cell'>{gender}</div>
            <div className='table__cell'>{ip_address}</div>
          </div>,
        )}
      </div>
    </div>
  </div>;
};

export default SortableTable;
