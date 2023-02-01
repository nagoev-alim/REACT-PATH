import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useState } from 'react';

const stars = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const RatingStars = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingSecond, setRatingSecond] = useState(0);
  const [hoverSecond, setHoverSecond] = useState(0);

  return <div className='rating'>
    <h1 className='title rating__title'>Rating Stars</h1>

    <h3 className='h5'>No Clickable Stars</h3>
    {stars.map((value) => <FixedStars key={value} value={value} />)}

    <h3 className='h5'>Clickable Stars</h3>
    <ul className='rating__list clickable-stars'>{[...Array(5)].map((i, index) =>
      <li key={index + 1}>
        <ClickableStars
          index={index + 1}
          hover={hover}
          rating={rating}
          setHover={setHover}
          setRating={setRating}
        />
      </li>,
    )}
    </ul>

    <h3 className='h5'>Clickable Stars (Second)</h3>
    <ul className='rating__list clickable-stars'>{[...Array(5)].map((i, index) =>
      <li key={index + 1}>
        <ClickableStarsSecond
          index={index + 1}
          hover={hoverSecond}
          rating={ratingSecond}
          setHover={setHoverSecond}
          setRating={setRatingSecond}
        />
      </li>,
    )}
    </ul>
  </div>;
};

// 🚀 COMPONENT - FixedStars: ================================
const FixedStars = ({ value }) => {
  const getStart = (value) => {
    const stars = [];
    const [whole, part] = parseFloat(value).toString().split('.');
    for (let i = 0; i < whole; i++) stars.push(<FaStar size={25} />);
    if (part) stars.push(<FaStarHalfAlt size={25} />);
    for (let i = whole; i < (part ? 4 : 5); i++) stars.push(<FaRegStar size={25} />);
    return stars;
  };

  return <ul className='rating__list fixed-stars'>
    {getStart(value).map((value, idx) =>
      <li key={idx}>
        <button>{value}</button>
      </li>,
    )}
  </ul>;
};

// 🚀 COMPONENT - ClickableStars: ================================
const ClickableStars = ({ index, hover, rating, setHover, setRating }) => (
  <button
    type='button'
    className={index <= (hover || rating) ? 'on' : 'off'}
    onClick={() => setRating(index)}
    onMouseEnter={() => setHover(index)}
    onMouseLeave={() => setHover(rating)}
  >
    <span className='star'>&#9733;</span>
  </button>
);

// 🚀 COMPONENT - ClickableStarsSecond: ================================
const ClickableStarsSecond = ({ index, hover, rating, setHover, setRating }) => (
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


export default RatingStars;
