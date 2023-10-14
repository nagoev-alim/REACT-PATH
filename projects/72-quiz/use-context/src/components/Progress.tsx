import { useAppContext } from '../context/AppContext.tsx';

/**
 * @interface {Object} Props - Свойства компонента Progress.
 * @property {number} numOfQuestions - Общее количество вопросов.
 * @property {number} totalPoints - Общее количество баллов.
 */
interface Props {
  numOfQuestions: number;
  totalPoints: number;
}

/**
 * Компонент для отображения прогресса викторины.
 *
 * @param {Props} props - Объект, содержащий свойства компонента Progress.
 * @returns {JSX.Element} Возвращает JSX-элемент, отображающий прогресс викторины.
 */
const Progress = ({ numOfQuestions, totalPoints }: Props) => {
  const { index, answer, points } = useAppContext();
  return (
    <header className='progress'>
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>Question <strong>{index + 1}</strong> / {numOfQuestions}</p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  );
};
export default Progress;
