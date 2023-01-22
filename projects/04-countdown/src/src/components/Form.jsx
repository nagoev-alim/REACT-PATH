import { toast } from 'react-hot-toast';

/**
 * @function Form
 * @param showForm
 * @param setShowForm
 * @param setTimer
 * @return {JSX.Element|null}
 * @constructor
 */
const Form = ({ showForm, setShowForm, setTimer }) => {
  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { title, date } = Object.fromEntries(new FormData(form).entries());

    if (title.trim().length === 0 || date.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    setTimer(() => ({ title, date }));
    setShowForm(false);
    form.reset();
  };

  // =====================
  // 🚀 Render
  // =====================
  return showForm ?
    <form className='form' onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input type='text' name='title' placeholder='What are you counting down to?' />
      </label>
      <label>
        <span>Date</span>
        <input type='date' name='date' min={new Date().toISOString().split('T')[0]} />
      </label>
      <button type='submit'>Submit</button>
    </form> : null;
};

export default Form;
