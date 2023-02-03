import toast from 'react-hot-toast';
import {
  ADD_FEEDBACK,
  EDIT_FEEDBACK,
  FETCH_FEEDBACK,
  IS_ERROR,
  IS_LOADING,
  UPDATE_FEEDBACK,
} from '../../context/constant.js';
import { actions } from '../../context/AppActions.js';
import { useEffect, useState } from 'react';
import { useAppHook } from '../../context/AppContext.jsx';

const Form = () => {
  const { dispatch, isLoading, editable, theme } = useAppHook();
  const [btnLabel, setBtnLabel] = useState('Send');
  const [rating, setRating] = useState(10);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editable.isEdit && editable.item) {
      setRating(editable.item.rating);
      setTitle(editable.item.title);
      setBtnLabel('Update');
    }
  }, [editable]);

  // 🚀 METHODS: ================================
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (title.length === 0 || !rating) {
      toast.error('Please fill the fields.');
      return;
    }
    if (title.length < 10) {
      toast.error('Review must be at least 10 character.');
      return;
    }
    try {
      dispatch({ type: IS_LOADING, payload: true });
      if (editable.isEdit) {
        setBtnLabel('Update...');
        dispatch({ type: UPDATE_FEEDBACK, payload: await actions.update(editable.item.id, { rating, title }) });
      } else {
        setBtnLabel('Sending...');
        dispatch({ type: ADD_FEEDBACK, payload: await actions.add({ rating, title }) });
      }
      dispatch({ type: FETCH_FEEDBACK, payload: await actions.fetch() });
      dispatch({ type: IS_LOADING, payload: false });
      setBtnLabel('Send');
    } catch (e) {
      setBtnLabel('Send');
      dispatch({ type: IS_ERROR, payload: true });
      console.log(e);
    }
    setRating(10);
    setTitle('');
  };

  const onCancel = () => {
    dispatch({ type: EDIT_FEEDBACK, payload: { isEdit: false, item: null } });
    setBtnLabel('Send');
    setRating(10);
    setTitle('');
  };

  // 🚀 RENDER: ================================
  return <form className='form' onSubmit={onSubmit}>
    <h3 className='h5'>How would you rate your service with us?</h3>

    <ul className='form__ratings'>
      {[...Array(10)].map((n, i) => i + 1).map(number =>
        <li key={number}>
          <label>
            <input
              className='visually-hidden'
              type='radio'
              name='rating'
              value={number}
              checked={rating === number}
              onChange={({ target: { value } }) => setRating(Number(value))} />
            <span className='h5'>{number}</span>
          </label>
        </li>,
      )}
    </ul>

    <div className='form__wrap'>
      <input
        type='text'
        placeholder='Write a review...'
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
      />
      <button
        className={`button button--fluid ${theme === 'light' ? 'button--primary' : 'button--green'}`}
        disabled={isLoading}
        type='submit'
      >{btnLabel}</button>
    </div>

    {editable.isEdit &&
      <button
        className='button button--red button--fluid'
        type='button'
        onClick={onCancel}
      >Cancel Update</button>}
  </form>;
};

export default Form;
