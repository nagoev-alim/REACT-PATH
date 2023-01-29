import { toast } from 'react-hot-toast';
import { useAppHook } from '../../context/AppContext.jsx';
import { CONSTANTS } from '../../context/constant.js';

const Form = () => {
  const { dispatch, showForm } = useAppHook();

  // 🚀 METHODS: ================================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { title, date } = Object.fromEntries(new FormData(form).entries());
    if (title.trim().length === 0 || date.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    dispatch({
      type: CONSTANTS.SET_COUNTDOWN,
      payload: { title, date },
    });
    dispatch({ type: CONSTANTS.TOGGLE_FORM });
    localStorage.setItem('countdown', JSON.stringify({ title, date }));
    form.reset();
  };

  // 🚀 RENDER: ================================
  return showForm ?
    <form className='countdown__form' onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input type='text' name='title' placeholder='What are you counting down to?' />
      </label>
      <label>
        <span>Date</span>
        <input type='date' name='date' min={new Date().toISOString().split('T')[0]} />
      </label>
      <button className='button button--fluid' type='submit'>Submit</button>
    </form> : null;
};

export default Form;
