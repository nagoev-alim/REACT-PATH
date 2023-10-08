import { Toaster } from 'react-hot-toast';
import { Form, Header, Stats, List } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Feedback UI".
 */
const App = () => {
  return (
    <div className=''>
      <Header />
      <div className='mx-auto max-w-2xl w-full p-3 grid gap-3 my-3'>
        <Form />
        <Stats />
        <List />
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
