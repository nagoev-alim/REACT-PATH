import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { getRandomNumber } from '../../utils/getRandomNumber.js';
import finish from '../../assets/images/finish.png';
import { useDispatch, useSelector } from 'react-redux';
import { actionHandlers } from '../../redux/actions.js';
import { useNavigate } from 'react-router-dom';

/**
 * @function FinishPage
 * @return {JSX.Element}
 * @constructor
 */
const FinishPage = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const { score, amount } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      angle: getRandomNumber(55, 125),
      spread: getRandomNumber(50, 70),
      particleCount: getRandomNumber(50, 100),
      origin: { y: 0.6 },
    });
  }, []);

  // =====================
  // 🚀 Render
  // =====================
  return <div className='quiz__finish'>
    <h2 className='title'>Finish</h2>
    <img src={finish} alt='Finish' />
    <p>You answered {score}{' '}/{' '}{amount} questions correctly</p>
    <button className='button' onClick={() => {
      dispatch(actionHandlers.score(0));
      dispatch(actionHandlers.amount(10));
      navigate('/');
    }}>Play again
    </button>
  </div>;
};

export default FinishPage;
