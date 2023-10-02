import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.tsx';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Word Scramble Game".
 */
const App: FC = () => {
  const { word, hint, time, inputRef, initGame, btnRef, checkWord } = useAppContext();

  return (
    <div className='bg-white border shadow rounded max-w-md w-full p-3 grid gap-4'>
      <h1 className='text-center font-bold text-2xl md:text-4xl'>Word Scramble Game</h1>
      <div className='grid gap-3'>
        <p className='font-bold text-2xl uppercase tracking-widest text-center'>{word}</p>
        <div className='grid gap-3'>
          <p className='font-medium'>
            Hint: <span className='bg-gray-200 p-1 rounded font-normal'>{hint}</span>
          </p>
          <p className='font-medium'>
            Time Left: <span className='bg-gray-200 p-1 rounded font-normal'>{`${time}s`}</span>
          </p>
        </div>
        <input ref={inputRef} className='input' type='text' spellCheck='false' placeholder='Enter a valid word' />
        <div className='grid grid-cols-2 gap-2'>
          <button className='btn' onClick={initGame}>Refresh Word</button>
          <button ref={btnRef} className='btn disabled:bg-gray-200 disabled:text-gray-300' onClick={checkWord}>Check
            Word
          </button>
        </div>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
