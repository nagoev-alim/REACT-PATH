import { Ping } from '@uiball/loaders';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios.tsx';
import { decode } from 'html-entities';
import { actionHandlers } from '../context/AppActions.tsx';

/**
 * Компонент вопросов викторины.
 *
 * @returns {JSX.Element} React-элемент компонента вопросов.
 */
const Questions = () => {
  let { dispatch, category, difficulty, type, amount, score } = useAppContext();
  const {
    response,
    errors,
    isLoading,
  } = useAxios({ params: `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}` });
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIdx];
      console.log(question.correct_answer);
      let answers = [...question.incorrect_answers];
      answers.splice(Math.floor(Math.random() * Math.floor(question.incorrect_answers.length)), 0, question.correct_answer);
      setAnswers(answers);
    }
  }, [response, questionIdx]);

  /**
   * Обработчик клика по ответу на вопрос.
   *
   * @param {Object} event - Событие клика на ответе.
   */
  function handleClick({ target: { textContent: selectAnswer } }) {
    selectAnswer === response.results[questionIdx].correct_answer ? dispatch(actionHandlers.score(score + 1)) : false;
    questionIdx + 1 < response.results.length ? setQuestionIdx(questionIdx + 1) : navigate('/score');
  }

  if (errors) {
    return <div className='grid place-items-center'>❌ Something went wrong.</div>;
  }

  return (
    isLoading
      ? (
        <div className='grid place-items-center'>
          <Ping size={45} speed={2} color='black' />
        </div>
      )
      : (
        <div className='grid gap-2'>
          <h2 className='text-center font-bold text-4xl'>Question {questionIdx + 1}</h2>
          <p className='text-center'>{decode(response.results[questionIdx].question)}</p>
          <ul className='grid gap-2 grid-cols-2'>
            {answers.length !== 0 && answers.map((q, idx) =>
              <li className='w-full' key={idx}>
                <button className='btn w-full' onClick={handleClick}>{decode(q)}</button>
              </li>,
            )}
          </ul>
          <p className='text-center'><span className='font-bold'>Score:</span> {score} / {response.results.length}</p>
        </div>
      )
  );
};

export default Questions;
