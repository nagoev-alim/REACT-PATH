import { Option } from './index.ts';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент вопроса.
 *
 * @returns {JSX.Element} Возвращает JSX-элемент с текстом вопроса и компонентом Option.
 */
const Question = () => {
  const {questions, index} = useAppContext();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Option question={questions[index]}/>
    </div>
  );
};

export default Question;
