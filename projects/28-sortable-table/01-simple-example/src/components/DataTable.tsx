/**
 * Интерфейс для свойств компонента DataTable.
 * @interface
 */
interface IDataTableProps {
  data: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
  };
}

/**
 * React-компонент для отображения данных в виде таблицы.
 * @function
 * @name DataTable
 * @param {IDataTableProps} props - Свойства компонента DataTable.
 */
const DataTable = ({ data }: IDataTableProps) => {
  // Определение столбцов таблицы на основе данных.
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div className='text-sm break-all overflow-auto'>
      <div className='grid grid-cols-[100px_170px_170px_170px_170px_170px_170px]'>
        {data[0] && columns.map((heading, idx) => {
          return <div key={idx} className='border p-2 bg-neutral-500 text-white'>{heading}</div>;
        })}
      </div>
      {data.map((row, rowIdx) =>
        <div className='grid grid-cols-[100px_170px_170px_170px_170px_170px_170px] bg-white' key={rowIdx}>
          {columns.map((column, columnIdx) => <div key={columnIdx} className='p-2 border'>{row[column]}</div>)}
        </div>,
      )}
    </div>
  );
};

export default DataTable;
