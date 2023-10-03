import { FC } from 'react';
import { Toaster } from 'react-hot-toast';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "".
 */
const App: FC = () => {

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'></h1>

      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
