import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';

/**
 * @interface {Object} Props - Свойства компонента NextButton.
 * @property {number} numOfQuestions - Общее количество вопросов.
 */
interface Props {
  numOfQuestions: number;
}

/**
 * Компонент кнопки "Далее" или "Завершить" в викторине.
 *
 * @param {Props} props - Объект, содержащий свойства компонента NextButton.
 * @returns {JSX.Element|null} Возвращает JSX-элемент кнопки "Далее" или "Завершить", либо `null`, если ответ не был дан.
 */
const NextButton = ({ numOfQuestions }: Props) => {
  const { answer, index, dispatch } = useAppContext();
  if (answer === null) {
    return null;
  }
  if (index < numOfQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: TYPES.nextQuestion })}>Next</button>
    );
  }
  if (index === numOfQuestions - 1) {
    return (
      <button className='btn btn-ui' onClick={() => dispatch({ type: TYPES.finish })}>
        Finish
      </button>
    );
  }
};

export default NextButton;