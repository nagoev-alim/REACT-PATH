import classNames from 'classnames';

/**
 * Создает массив чисел в диапазоне от `start` до `end - 1`.
 * @function
 * @param {number} start - Начальное значение диапазона (включительно).
 * @param {number} end - Конечное значение диапазона (исключая).
 * @returns {number[]} Массив чисел в указанном диапазоне.
 */
const range = (start: number, end: number) => {
  return [...Array(end - start).keys()].map((el) => el + start);
};
/**
 * Вычисляет диапазон страниц, отображаемых в пагинации.
 * @function
 * @param {Object} param0 - Параметры для вычисления диапазона.
 * @param {number} param0.pagesCount - Общее количество страниц.
 * @param {number} param0.pagesCutCount - Количество страниц, отображаемых в пагинации.
 * @param {number} param0.currentPage - Текущая страница.
 * @returns {Object} Объект с начальной и конечной страницами диапазона.
 */
const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }: {
  pagesCount: number,
  pagesCutCount: number,
  currentPage: number
}) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);
  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

/**
 * Интерфейс свойств компонента PaginationItem.
 * @interface
 */
interface IPaginationItemProps {
  page: string | number;
  currentPage: number;
  onPageChange: (num: number | string) => void;
  isDisabled: boolean;
}

/**
 * Компонент для отображения элемента пагинации.
 * @component
 * @param {IPaginationItemProps} props - Свойства компонента.
 * @param {string|number} props.page - Номер страницы или текст (например, 'Prev' или 'Next').
 * @param {number} props.currentPage - Текущая страница.
 * @param {Function} props.onPageChange - Функция для обработки события изменения страницы.
 * @param {boolean} props.isDisabled - Флаг, указывающий, отключен ли элемент пагинации.
 */
const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }: IPaginationItemProps) => {
  const liClasses = classNames({
    'page-item': true,
    active: page === currentPage,
    disabled: isDisabled,
  });
  return (
    <li>
      <button
        className={`btn ${liClasses.includes('active') ? 'bg-neutral-500 text-white hover:bg-neutral-500' : ''} `}
        onClick={() => onPageChange(page)}
        disabled={liClasses.includes('disabled')}
      >
        {page}
      </button>
    </li>
  );
};

/**
 * Интерфейс свойств компонента Pagination.
 * @interface
 */
interface IPaginationProps {
  currentPage: number,
  total: number,
  limit: number,
  onPageChange: (num: number) => void;
  loading?: boolean;
}

/**
 * Компонент для отображения пагинации.
 * @component
 * @param {IPaginationProps} props - Свойства компонента.
 * @param {number} props.currentPage - Текущая страница.
 * @param {number} props.total - Общее количество элементов.
 * @param {number} props.limit - Количество элементов на странице.
 * @param {Function} props.onPageChange - Функция для обработки события изменения страницы.
 * @param {Function} props.loading - Статус загрузки.
 */
const Pagination = ({ currentPage, total, limit, onPageChange, loading }: IPaginationProps) => {
  const pagesCount = Math.ceil(total / limit);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return !loading ? (
    <div className='flex justify-center'>
      <ul className='flex gap-2 flex-wrap justify-center'>
        <PaginationItem
          page='First'
          currentPage={currentPage}
          onPageChange={() => onPageChange(1)}
          isDisabled={isFirstPage}
        />
        <PaginationItem
          page='Prev'
          currentPage={currentPage}
          onPageChange={() => onPageChange(currentPage - 1)}
          isDisabled={isFirstPage}
        />
        {pages.map((page) => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ))}
        <PaginationItem
          page='Next'
          currentPage={currentPage}
          onPageChange={() => onPageChange(currentPage + 1)}
          isDisabled={isLastPage}
        />
        <PaginationItem
          page='Last'
          currentPage={currentPage}
          onPageChange={() => onPageChange(pagesCount)}
          isDisabled={isLastPage}
        />
      </ul>
    </div>
  ) : null;
};
export default Pagination;
