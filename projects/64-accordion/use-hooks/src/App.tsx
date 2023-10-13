import { Example01, Example02 } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {

  return (
    <div className='max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'></h1>
      <Example01/>
      <Example02/>
    </div>
  );
};

export default App;
