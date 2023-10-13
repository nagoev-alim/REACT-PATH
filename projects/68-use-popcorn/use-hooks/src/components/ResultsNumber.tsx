interface IResultsNumberProps {
  items: [];
}

/**
 * Компонент, отображающий количество найденных результатов.
 *
 * @param {IResultsNumberProps} props - Пропсы компонента.
 * @param {Array} props.items - Массив элементов для подсчета количества результатов.
 * @returns {JSX.Element} Возвращает JSX-разметку с информацией о количестве результатов.
 */
const ResultsNumber = ({ items: movies }: IResultsNumberProps) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default ResultsNumber;
