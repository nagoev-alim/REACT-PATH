import { FC } from 'react';
import { Result } from './components';
import { useAppContext } from './context/AppContext.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Characters Counter".
 */
const App: FC = () => {
  const { charactersState, handleChange } = useAppContext();
  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Characters Counter</h1>
      <textarea
        className='input input-area'
        placeholder='Enter some text below'
        onChange={handleChange}
        value={charactersState.text}
      />
      <div className='grid grid-cols-4'>
        <Result label='Chars' value={charactersState.chars} />
        <Result label='Words' value={charactersState.words} />
        <Result label='Spaces' value={charactersState.spaces} />
        <Result label='Letters' value={charactersState.letters} />
      </div>
    </div>
  );
};

export default App;
