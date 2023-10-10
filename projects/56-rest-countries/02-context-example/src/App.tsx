import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from './router.tsx';
import { Header } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "REST Countries".
 */
const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Header/>
        <div className='mx-auto max-w-4xl w-full my-5'>
          <Suspense fallback={<div className='text-center font-bold text-3xl'>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </div>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
