import classes from './Form.module.css';
import toast from 'react-hot-toast';
import { useContextHook } from '../../../context/app-context';


const Form = () => {
  const {searchByTitle} = useContextHook();

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).query.trim().toLowerCase();

    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }

    await searchByTitle(query)
  };

  return <form className={classes.form} onSubmit={onSubmit}>
    <h1 className={classes.title}>Search APIs</h1>
    <input type='text' name='query' placeholder='Enter keywords' />
    <button className='button button--blue button--fluid' type='submit'>Search</button>
  </form>;
};

export default Form;
