import { useAppContext } from '../context/AppContext.tsx';
import { Question } from '../types';
import { TYPES } from '../utils/constants.ts';

/**
 * @interface {Object} Props - Свойства компонента Option.
 * @property {Question} question - Вопрос, для которого отображаются варианты ответов.
 */
interface Props {
  question: Question;
}

/**
 * Компонент для отображения вариантов ответов на вопрос.
 *
 * @param {Props} props - Объект, содержащий свойства компонента Option.
 * @returns {JSX.Element} Возвращает JSX-элемент с вариантами ответов.
 */
const Option = ({ question }: Props) => {
  const { answer, dispatch } = useAppContext();
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) =>
        <button
          key={option}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: TYPES.newAnswer, payload: index })}>
          {option}
        </button>,
      )}
    </div>
  );
};

export default Option;
