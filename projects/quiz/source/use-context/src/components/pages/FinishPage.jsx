import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { getRandomNumber } from '../../utils/getRandomNumber.js';
import finish from '../../assets/images/finish.png';
import { useNavigate } from 'react-router-dom';
import { actionHandlers } from '../../context/AppActions.js';
import { useAppHook } from '../../context/AppContext.jsx';

const FinishPage = () => {
  const { dispatch, score, amount } = useAppHook();
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      angle: getRandomNumber(55, 125),
      spread: getRandomNumber(50, 70),
      particleCount: getRandomNumber(50, 100),
      origin: { y: 0.6 },
    });
  }, []);

  // 🚀 RENDER: ================================
  return <div className='quiz__finish'>
    <h1 className='quiz__title title'>Finish</h1>
    <img src={finish} alt='Finish' />
    <p>You answered {score}{' '}/{' '}{amount} questions correctly</p>
    <button className='button button--green' onClick={() => {
      dispatch(actionHandlers.score(0));
      dispatch(actionHandlers.amount(10));
      navigate('/');
    }}>Play again
    </button>
  </div>;
};

export default FinishPage;
