import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';

/**
 * @interface {Object} Props - Свойства компонента FinishScreen.
 * @property {number} totalPoints - Общее количество баллов в викторине.
 */
interface Props {
  totalPoints: number;
}

/**
 * Компонент экрана завершения викторины.
 *
 * @param {Props} props - Объект, содержащий свойства компонента FinishScreen.
 * @returns {JSX.Element} Возвращает JSX-элемент, отображающий результат викторины, высший балл и кнопку "Перезапустить викторину".
 */
const FinishScreen = ({ totalPoints }: Props) => {
  const { points, highscore, dispatch } = useAppContext();
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button className='btn btn-ui' onClick={() => dispatch({ type: TYPES.restart })}>Restart Quiz</button>
    </>
  );
};

export default FinishScreen;