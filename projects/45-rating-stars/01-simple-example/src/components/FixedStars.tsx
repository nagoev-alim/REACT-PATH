import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { JSX } from 'react';

/**
 * Компонент для отображения фиксированного количества звезд.
 *
 * @param {Object} props - Свойства компонента.
 * @param {number} props.value - Значение рейтинга, от 0 до 5.
 * @returns {JSX.Element} - React-элемент, представляющий фиксированный рейтинг звезд.
 */
const FixedStars = ({ value }: { value: number }) => {
  /**
   * Функция для получения массива элементов звезд.
   *
   * @param {number} value - Значение рейтинга, от 0 до 5.
   * @returns {JSX.Element[]} - Массив React-элементов звезд.
   */
  function getStart(value: number): JSX.Element[] {
    const stars = [];
    const [whole, part] = parseFloat(value).toString().split('.');
    for (let i = 0; i < whole; i++) stars.push(<FaStar size={25} />);
    if (part) stars.push(<FaStarHalfAlt size={25} />);
    for (let i = whole; i < (part ? 4 : 5); i++) stars.push(<FaRegStar size={25} />);
    return stars;
  }

  return (
    <ul className='grid grid-cols-5 gap-1'>
      {getStart(value).map((value, idx) =>
        <li className='flex' key={idx}>
          <button>{value}</button>
        </li>,
      )}
    </ul>
  );
};

export default FixedStars;
