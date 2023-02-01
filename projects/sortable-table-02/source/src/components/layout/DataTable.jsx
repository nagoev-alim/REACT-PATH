const DataTable = ({ data }) => {
  const columns = data[0] && Object.keys(data[0]);

  return <div className='table__wrapper'>
    <div className='table'>
      <div className='table__header'>
        <div className='table__row'>
          {data[0] && columns.map((heading, idx) => <div key={idx} className='table__cell'>{heading}</div>)}
        </div>
      </div>
      <div className='table__body'>
        {data.map((row, rowIdx) =>
          <div className='table__row' key={rowIdx}>
            {columns.map((column, columnIdx) => <div key={columnIdx} className='table__cell'>{row[column]}</div>)}
          </div>,
        )}
      </div>
    </div>
  </div>;
};

export default DataTable;
