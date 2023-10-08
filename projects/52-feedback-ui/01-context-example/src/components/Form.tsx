import { useAppContext } from '../context/AppContext.tsx';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TYPES } from '../utils/constants.ts';
import { actions } from '../context/AppActions.tsx';

/**
 * Компонент формы для отправки отзывов.
 * @function
 * @name Form
 * @returns {JSX.Element} React-элемент компонента формы.
 */
const Form = () => {
  const { dispatch, isLoading, editable } = useAppContext();
  const [btnLabel, setBtnLabel] = useState<string>('Send');
  const [rating, setRating] = useState<number>(10);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (editable.isEdit && editable.item) {
      setRating(editable.item.rating);
      setTitle(editable.item.title);
      setBtnLabel('Update');
    }
  }, [editable]);

  /**
   * Обработчик отправки формы.
   * @async
   * @function
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (title.length === 0 || !rating) {
      toast.error('Please fill the fields.');
      return;
    }
    if (title.length < 10) {
      toast.error('Review must be at least 10 character.');
      return;
    }
    try {
      dispatch({ type: TYPES.IS_LOADING, payload: true });
      if (editable.isEdit) {
        setBtnLabel('Update...');
        dispatch({ type: TYPES.UPDATE_FEEDBACK, payload: await actions.update(editable.item.id, { rating, title }) });
      } else {
        setBtnLabel('Sending...');
        dispatch({ type: TYPES.ADD_FEEDBACK, payload: await actions.add({ rating, title }) });
      }
      dispatch({ type: TYPES.FETCH_FEEDBACK, payload: await actions.fetch() });
      dispatch({ type: TYPES.IS_LOADING, payload: false });
      setBtnLabel('Send');
    } catch (e) {
      setBtnLabel('Send');
      dispatch({ type: TYPES.IS_ERROR, payload: true });
      console.log(e);
    }
    setRating(10);
    setTitle('');
  }

  /**
   * Обработчик отмены редактирования или отправки.
   * @function
   */
  const handleCancel = () => {
    dispatch({ type: TYPES.EDIT_FEEDBACK, payload: { isEdit: false, item: null } });
    setBtnLabel('Send');
    setRating(10);
    setTitle('');
  };

  return (
    <form className='bg-white p-3 border-2 rounded grid gap-3 dark:bg-neutral-700' onSubmit={handleSubmit}>
      <h3 className='text-center text-xl font-bold'>How would you rate your service with us?</h3>
      <ul className='flex flex-wrap justify-center items-center gap-2'>
        {[...Array(10)].map((_n, i) => i + 1).map(number =>
          <li key={number}>
            <label>
              <input
                className='visually-hidden'
                type='radio'
                name='rating'
                value={number}
                checked={rating === number}
                onChange={({ target: { value } }) => setRating(Number(value))} />
              <span className='cursor-pointer font-bold w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full'>{number}</span>
            </label>
          </li>,
        )}
      </ul>

      <div className='grid gap-2'>
        <input
          className='input dark:bg-neutral-700'
          type='text'
          placeholder='Write a review...'
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <button
          className='btn dark:bg-neutral-700'
          disabled={isLoading}
          type='submit'
        >{btnLabel}</button>
      </div>
      {editable.isEdit && (
        <button className='btn border-2 border-red-400 bg-red-200 hover:bg-red-300' type='button'
                onClick={handleCancel}>
          Cancel Update
        </button>
      )}
    </form>
  );
};

export default Form;
