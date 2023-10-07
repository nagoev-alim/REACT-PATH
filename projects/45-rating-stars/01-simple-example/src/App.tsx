import { useState } from 'react';
import { ClickableStars, ClickableStarsSecond, FixedStars } from './components';

const stars = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Rating Stars".
 */
const App = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [ratingSecond, setRatingSecond] = useState<number>(0);
  const [hoverSecond, setHoverSecond] = useState<number>(0);

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Rating Stars</h1>
      <div className='grid gap-2 place-items-center'>
        <h3 className='text-lg font-bold'>No Clickable Stars</h3>
        {stars.map((value) => <FixedStars key={value} value={value} />)}
      </div>
      <div className='grid gap-2 place-items-center'>
        <h3 className='text-lg font-bold'>Clickable Stars</h3>
        <ul className='grid grid-cols-5'>{[...Array(5)].map((_i, index) =>
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
      </div>
      <div className='grid gap-2 place-items-center'>
        <h3 className='text-lg font-bold'>Clickable Stars Second</h3>
        <ul className='grid grid-cols-5'>{[...Array(5)].map((_i, index) =>
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
      </div>
    </div>
  );
};

export default App;
