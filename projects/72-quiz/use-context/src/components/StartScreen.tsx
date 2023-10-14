import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';

/**
 * @typedef {Object} Props - Свойства компонента StartScreen.
 * @property {number} numOfQuestions - Количество вопросов для викторины.
 */
interface Props {
  numOfQuestions: number;
}

/**
 * Компонент начального экрана викторины.
 *
 * @param {Props} props - Объект, содержащий свойства компонента StartScreen.
 * @returns {JSX.Element} Возвращает JSX-элемент начального экрана.
 */
const StartScreen = ({ numOfQuestions }: Props) => {
  const { dispatch } = useAppContext();
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} question to test your React mastery</h3>
      <button className='btn btn-ui' onClick={() => dispatch({ type: TYPES.start })}>Let's start</button>
    </div>
  );
};

export default StartScreen;
