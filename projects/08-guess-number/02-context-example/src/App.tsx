import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.tsx';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Guess Number".
 */
const App: FC = () => {
  const { inputRef, handleSubmit } = useAppContext();

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Guess Number</h1>
      <p>Guess the number is a game in which you have to guess the number given by the computer between 0 and 10. Use as
        few tries as possible. Good luck!</p>
      <form onSubmit={handleSubmit}>
        <label aria-label='Enter the number'>
          <input
            className='input'
            type='number'
            name='guess'
            placeholder='Enter the number'
            min='1'
            max='10'
            ref={inputRef}
          />
        </label>
      </form>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
