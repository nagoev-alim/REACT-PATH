import useAxios from '../../hooks/useAxios.jsx';
import { Select } from '../index.js';
import { Ping } from '@uiball/loaders';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppHook } from '../../context/AppContext.jsx';
import { actionHandlers } from '../../context/AppActions.js';

const OPTIONS = {
  difficulty: [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ],
  type: [
    { id: 'multiple', name: 'Multiple Choise' },
    { id: 'boolean', name: 'True/False' },
  ],
};

const SetupPage = () => {
  const { dispatch } = useAppHook();
  const { response, errors, isLoading } = useAxios({ params: '/api_category.php' });
  const navigate = useNavigate();

  if (errors) return <div className='error'>❌ Something went wrong.</div>;

  // 🚀 METHODS: ================================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { category, difficulty, type, number } = Object.fromEntries(new FormData(form).entries());

    if (
      Number(category) === 0 ||
      difficulty.trim().length === 0 ||
      type.trim().length === 0 ||
      Number(number) === 0
    ) {
      toast.error('Please select and fill all fields.');
      return;
    }

    navigate('/questions');
  };

  // 🚀 RENDER: ================================
  return isLoading
    ? <div className='loading'><Ping size={45} speed={2} color='black' /></div>
    : <div>
      <h1 className='title quiz__title'>Quiz</h1>
      <form className='quiz__form' onSubmit={onSubmit}>
        <Select name='category' options={response.trivia_categories} label='Category' />
        <Select name='difficulty' options={OPTIONS.difficulty} label='Difficulty' />
        <Select name='type' options={OPTIONS.type} label='Type' />
        <input type='number' name='number' placeholder='Number of Questions' min='1' step='1' max='50'
               onChange={({ target: { value } }) => dispatch(actionHandlers.amount(value))}
        />
        <button className='button button--fluid button--primary' type='submit'>Get started</button>
      </form>
    </div>;
};

export default SetupPage;
