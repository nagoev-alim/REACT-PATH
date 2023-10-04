interface IPaginationProps {
  currentPage: number;
  perPageCount: number;
  totalUsers: number;
  paginate: (number: number) => void;
  loading: boolean;
}

/**
 * Компонент для отображения пагинации.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.currentPage - Текущая страница.
 * @param {number} props.perPageCount - Количество элементов на странице.
 * @param {number} props.totalUsers - Общее количество пользователей.
 * @param {function} props.paginate - Функция для переключения на выбранную страницу.
 * @param {function} props.paginate - Функция для переключения на выбранную страницу.
 */
const Pagination = ({ currentPage, paginate, perPageCount, totalUsers, loading }: IPaginationProps) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalUsers / perPageCount); i++) pageNumbers.push(i);

  /**
   * Обработчик для перехода на предыдущую страницу.
   * @function
   */
  function handlePrev(): void {
    if (currentPage !== 0) paginate(currentPage -= 1);
  }

  /**
   * Обработчик для перехода на следующую страницу.
   * @function
   */
  function handleNext(): void {
    if (currentPage <= pageNumbers.length - 1) paginate(currentPage += 1);
  }


  return !loading ? (
    <div className='flex justify-center'>
      <ul className='flex gap-2 flex-wrap justify-center'>
        <li>
          <button className='btn disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={currentPage === pageNumbers[0]} onClick={handlePrev}>
            Prev
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button className={`btn ${number === currentPage ? 'bg-neutral-500 text-white' : ''}`}
                    onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        <li>
          <button className='btn disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={currentPage === pageNumbers.length} onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </div>
  ) : null;
};

export default Pagination;
