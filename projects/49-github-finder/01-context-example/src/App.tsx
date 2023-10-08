import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router.tsx';
import { Header } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "GitHub Finder".
 */
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div className='text-2xl text-center'>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
