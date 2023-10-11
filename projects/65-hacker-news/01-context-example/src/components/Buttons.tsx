import { useAppContext } from '../context/AppContext.tsx';
/**
 * React-компонент кнопок навигации.
 * @function
 * @name Buttons
 */
const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useAppContext();
  return (
    <div className='flex gap-2 justify-center items-center my-4'>
      <button className='btn' disabled={isLoading} onClick={() => handlePage('decrease')}>Prev</button>
      <p>{page + 1} of {nbPages}</p>
      <button className='btn' disabled={isLoading} onClick={() => handlePage('increase')}>Next</button>
    </div>
  );
};

export default Buttons;