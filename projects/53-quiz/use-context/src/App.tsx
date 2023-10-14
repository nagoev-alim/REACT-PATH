import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from './router.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Quiz".
 */
const App = () => {
  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <BrowserRouter>
        <Suspense fallback={<div className='text-3xl text-center font-bold'>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
