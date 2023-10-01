import { Toaster } from 'react-hot-toast';
import { Form, Screen } from './components';
import { useAppContext } from './context/AppContext.tsx';


/**
 * Компонент приложения для отображения экрана таймера.
 * @component
 */
const App = () => {
  /**
   * Получение контекста приложения для определения, следует ли отображать форму ввода времени.
   */
  const { showForm } = useAppContext();
  return (
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Timer</h1>
      {showForm ? <Form /> : <Screen />}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
