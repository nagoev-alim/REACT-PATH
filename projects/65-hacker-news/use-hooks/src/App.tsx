import { Toaster } from 'react-hot-toast';
import { Buttons, Form, Stories } from './components';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Hacker News".
 */
const App = () => {
  return (
    <div className='max-w-4xl mx-auto w-full p-3 grid items-start gap-3'>
      <h1 className='text-center font-bold text-4xl'>Hacker News</h1>
      <Form />
      <Buttons />
      <Stories />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
