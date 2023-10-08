import { Toaster } from 'react-hot-toast';
import { Form, Posts } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Twitty".
 */
const App = () => {

  return (
    <div className='mx-auto max-w-2xl w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Twitty</h1>
      <Form />
      <Posts />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
