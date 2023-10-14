import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import { getRandomNumber } from '../utils/getRandomNumber.ts';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { actionHandlers } from '../context/AppActions.tsx';
import finishImg from '/images/finish.png';

/**
 * Компонент завершения викторины.
 *
 * @returns {JSX.Element} React-элемент компонента завершения.
 */
const Finish = () => {
  const { dispatch, score, amount } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      angle: getRandomNumber(55, 125),
      spread: getRandomNumber(50, 70),
      particleCount: getRandomNumber(50, 100),
      origin: { y: 0.6 },
    });
  }, []);

  /**
   * Обработчик клика на кнопке "Play again".
   */
  function handleClick() {
    dispatch(actionHandlers.score(0));
    dispatch(actionHandlers.amount(10));
    navigate('/');
  }

  return (
    <div className='grid gap-2 place-items-center'>
      <h1 className='text-center font-bold text-4xl'>Finish</h1>
      <img className='max-w-[250px]' src={finishImg} alt='Finish' />
      <p>You answered <span className='font-bold'>{score}{' '}/{' '}{amount}</span> questions correctly</p>
      <button className='btn' onClick={handleClick}>Play again</button>
    </div>
  );
};

export default Finish;
