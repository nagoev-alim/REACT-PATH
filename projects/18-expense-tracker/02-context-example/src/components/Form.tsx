import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент формы для добавления транзакции.
 * @component
 */
const Form = () => {
  const { handleSubmit } = useAppContext();
  return (
    <>
      <h5 className='p-2 rounded bg-slate-50 font-bold border'>Add new transaction</h5>
      <form className='grid gap-3' onSubmit={handleSubmit}>
        <label className='grid gap-1'>
          <span className='text-sm font-medium'>Text</span>
          <input className='input' type='text' name='text' placeholder='Enter text' />
        </label>
        <label className='grid gap-1'>
          <span className='text-sm font-medium'>Amount (negative - expense, positive - income)</span>
          <input className='input' type='number' name='amount' placeholder='Enter amount' />
        </label>
        <button className='btn'>Add transaction</button>
      </form>
    </>
  );
};

export default Form;
