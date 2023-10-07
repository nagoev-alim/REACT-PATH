import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from './router.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Meal Finder".
 */
const App = () => {
  return (
    <div className='grid gap-3 items-start max-w-4xl w-full mx-auto'>
      <h1 className='text-center font-bold text-4xl'>Meal Finder</h1>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
