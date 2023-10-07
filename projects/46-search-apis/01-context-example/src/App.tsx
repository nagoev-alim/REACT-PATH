import { Toaster } from 'react-hot-toast';
import { Categories, Form, List } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Search API".
 */
const App = () => {

  return (
    <div className='max-w-4xl mx-auto w-full grid gap-3 items-start p-4'>
      <Form />
      <Categories />
      <List />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
