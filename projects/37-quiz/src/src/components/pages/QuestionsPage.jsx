import useAxios from '../../hooks/useAxios.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Ping } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionHandlers } from '../../redux/actions.js';
import { decode } from 'html-entities';

/**
 * @function QuestionsPage
 * @return {JSX.Element}
 * @constructor
 */
const QuestionsPage = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  let { category, difficulty, type, amount, score } = useSelector((state) => state);
  const {
    response,
    errors,
    isLoading,
  } = useAxios({ params: `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}` });
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (errors) return <div className='error'>❌ Something went wrong.</div>;

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIdx];
      console.log(question.correct_answer);
      let answers = [...question.incorrect_answers];
      answers.splice(Math.floor(Math.random() * Math.floor(question.incorrect_answers.length)), 0, question.correct_answer);
      setAnswers(answers);
    }
  }, [response, questionIdx]);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onClick - Answer button click event handler
   * @param selectAnswer
   */
  const onClick = ({ target: { textContent: selectAnswer } }) => {
    selectAnswer === response.results[questionIdx].correct_answer ? dispatch(actionHandlers.score(score + 1)) : false;
    questionIdx + 1 < response.results.length ? setQuestionIdx(questionIdx + 1) : navigate('/score');
  };

  // =====================
  // 🚀 Render
  // =====================
  return isLoading
    ? <div className='loading'><Ping size={45} speed={2} color='black' /></div>
    : <div className='quiz__questions'>
      <h2 className='title'>Question {questionIdx + 1}</h2>
      <p>{decode(response.results[questionIdx].question)}</p>
      <ul>
        {answers.length !== 0 && answers.map((q, idx) =>
          <li key={idx}>
            <button className='button' onClick={onClick}>{decode(q)}</button>
          </li>,
        )}
      </ul>
      <p><span>Score:</span> {score} / {response.results.length}</p>
    </div>;
};

export default QuestionsPage;
