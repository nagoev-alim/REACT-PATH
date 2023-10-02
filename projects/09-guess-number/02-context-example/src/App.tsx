import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "".
 */
const App: FC = () => {
  const { user, guess, inputRef, handleSubmit } = useAppContext();

  return (
    <div className='p-4 bg-neutral-700 text-yellow-400 min-h-screen'>
      <div className='grid gap-3 items-start '>
        <h1 className='text-2xl font-bold md:text-4xl'>🎲 Guess Number</h1>
        {user !== null && (
          <p>😄 <span className='font-bold'>{user}</span>, there is a number between 0 and 100. Try to guess it in the
            fewest number of tries. After
            each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
          </p>
        )}
        {guess.length !== 0 && (
          <ul className='grid gap-3'>{guess.map(({ number, message, isGuessed }, idx) =>
            <li className='grid gap-2' key={idx}>
              <p className='text-2xl font-medium'>➡️ {number}</p>
              <p>{message}</p>
              {isGuessed && <p>🎉 Number of attempts: <span className='font-bold'>{guess.length}</span></p>}
            </li>,
          )}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className='bg-transparent outline-none border-b-2 border-yellow-400 px-3 py-2.5 text-yellow-400 w-full'
            ref={inputRef}
            autoFocus
            name={`${!user ? 'username' : 'guess'}`}
            type={`${!user ? 'text' : 'number'}`} placeholder={`${!user ? '👋 Enter your name' : 'Enter number'}`}
          />
        </form>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
