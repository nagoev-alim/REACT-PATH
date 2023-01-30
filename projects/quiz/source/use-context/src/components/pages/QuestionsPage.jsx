import useAxios from '../../hooks/useAxios.jsx';
import { Ping } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import { actionHandlers } from '../../context/AppActions.js';
import { useAppHook } from '../../context/AppContext.jsx';

const QuestionsPage = () => {
  let { dispatch, category, difficulty, type, amount, score } = useAppHook();
  const {
    response,
    errors,
    isLoading,
  } = useAxios({ params: `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}` });
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

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

  // 🚀 METHODS: ================================
  const onClick = ({ target: { textContent: selectAnswer } }) => {
    selectAnswer === response.results[questionIdx].correct_answer ? dispatch(actionHandlers.score(score + 1)) : false;
    questionIdx + 1 < response.results.length ? setQuestionIdx(questionIdx + 1) : navigate('/score');
  };

  // 🚀 RENDER: ================================
  return isLoading
    ? <div className='loading'><Ping size={45} speed={2} color='black' /></div>
    : <div className='quiz__questions'>
      <h2 className='title quiz__title'>Question {questionIdx + 1}</h2>
      <p>{decode(response.results[questionIdx].question)}</p>
      <ul className='quiz__list'>
        {answers.length !== 0 && answers.map((q, idx) =>
          <li key={idx}>
            <button className='button button--primary button--fluid' onClick={onClick}>{decode(q)}</button>
          </li>,
        )}
      </ul>
      <p><span>Score:</span> {score} / {response.results.length}</p>
    </div>;
};

export default QuestionsPage;
