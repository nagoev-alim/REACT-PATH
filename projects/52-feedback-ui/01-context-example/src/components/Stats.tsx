import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения статистики отзывов.
 * @function
 * @name Stats
 * @returns {JSX.Element} React-элемент компонента для отображения статистики.
 */
const Stats = () => {
  const { feedback } = useAppContext();
  /**
   * Рассчитывает средний рейтинг на основе отзывов.
   * @function
   * @name average
   * @returns {string} Средний рейтинг в формате строки.
   */
  const average = () => {
    let data = feedback.length === 0 ? 0 : feedback.reduce((acc, { rating }) => acc + parseInt(rating), 0) / feedback.length;
    return data.toFixed(1).replace(/[.,]0$/, '');
  };

  return (
    <div className='flex flex-wrap gap-2 justify-between items-center'>
      <p className='font-medium'>{feedback.length} reviews</p>
      <p className='font-medium'>Average Rating: {average()}</p>
    </div>
  );
};

export default Stats;
