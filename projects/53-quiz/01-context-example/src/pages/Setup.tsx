import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import useAxios from '../hooks/useAxios.tsx';
import { Ping } from '@uiball/loaders';
import { OPTIONS } from '../utils/constants.ts';
import { toast } from 'react-hot-toast';
import { ChangeEvent, FormEvent } from 'react';
import { actionHandlers } from '../context/AppActions.tsx';
import { Select } from '../components';
/**
 * Компонент настройки параметров викторины перед началом игры.
 *
 * @returns {JSX.Element} React-элемент компонента настройки.
 */
const Setup = () => {
  const { dispatch } = useAppContext();
  const { response, errors, isLoading } = useAxios({ params: '/api_category.php' });
  const navigate = useNavigate();
  /**
   * Обработчик отправки формы настроек.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const category = parseInt(formData.get('category') as string, 10);
    const number = parseInt(formData.get('number') as string, 10);
    const difficulty = (formData.get('difficulty') as string).trim();
    const type = (formData.get('type') as string).trim();
    if (category === 0 || difficulty.length === 0 || type.length === 0 || number === 0) {
      toast.error('Please select and fill all fields.');
      return;
    }
    navigate('/questions');
  }
  /**
   * Обработчик изменения значения в поле "Number of Questions".
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения поля.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    dispatch(actionHandlers.amount(value));
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
          <h1 className='text-center font-bold text-4xl'>Quiz</h1>
          <form className='grid gap-2' onSubmit={handleSubmit}>
            <Select name='category' options={response.trivia_categories} label='Category' />
            <Select name='difficulty' options={OPTIONS.difficulty} label='Difficulty' />
            <Select name='type' options={OPTIONS.type} label='Type' />
            <input className='input' type='number' name='number' placeholder='Number of Questions' min='1' step='1' max='50'
                   onChange={handleChange} />
            <button className='btn' type='submit'>Get started</button>
          </form>
        </div>
      )
  );
};

export default Setup;
