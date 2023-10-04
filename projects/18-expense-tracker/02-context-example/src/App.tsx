import { Toaster } from 'react-hot-toast';
import { Form, Header, Stats, Transactions } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Expense Tracker".
 */
const App = () => {
  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Expense Tracker</h1>
      <div className='grid gap-3'>
        <Header />
        <Stats />
        <Transactions />
        <Form />
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
