import { FaRegStar, FaStar } from 'react-icons/fa';

interface IClickableStarsSecondProps {
  index: number;
  hover: number;
  rating: number;
  setHover: (n: number) => void;
  setRating: (n: number) => void;
}

/**
 * Компонент для отображения и взаимодействия с кликабельными звёздами рейтинга.
 *
 * @param {Object} props - Свойства компонента.
 * @param {number} props.index - Индекс текущей звезды.
 * @param {number} props.hover - Индекс звезды, над которой находится указатель мыши.
 * @param {number} props.rating - Текущий рейтинг.
 * @param {Function} props.setHover - Функция для установки индекса звезды, над которой находится указатель мыши.
 * @param {Function} props.setRating - Функция для установки рейтинга.
 * @returns {JSX.Element} - Компонент кликабельных звёзд рейтинга.
 */
const ClickableStarsSecond = ({ index, hover, rating, setHover, setRating }: IClickableStarsSecondProps) => (
  <button
    type='button'
    className={index <= (hover || rating) ? 'on' : 'off'}
    onClick={() => setRating(index)}
    onMouseEnter={() => setHover(index)}
    onMouseLeave={() => setHover(rating)}
  >
    {index <= (hover || rating) ? <FaStar size={25} /> : <FaRegStar size={25} />}
  </button>
);

export default ClickableStarsSecond;
