import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { Modal } from './components';
import { useAppContext } from './context/AppContext.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Modal Window".
 */
const App: FC = () => {
  const { modalOpen, toggleModal } = useAppContext();

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Modal Window</h1>
      <button className='btn text-white bg-green-400 max-w-max mx-auto hover:bg-green-500' onClick={toggleModal}>
        Open Modal
      </button>
      <Modal modalOpen={modalOpen} handleClick={toggleModal}>
        <button className='btn max-w-max ml-auto' onClick={toggleModal}>
          <FiX size={25} />
        </button>
        <h4 className='font-bold text-2xl'>Modal Title</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, quos?</p>
        <button className='btn text-white bg-red-400 hover:bg-red-500' onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
