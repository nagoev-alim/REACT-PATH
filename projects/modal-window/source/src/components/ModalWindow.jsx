import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Modal } from './index.js';

const ModalWindow = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keyup', ({ key }) => {
      return key === 'Escape' ? setModalOpen(false) : false;
    });
    return () => {
      document.removeEventListener('keyup', ({ key }) => {
        key === 'Escape' ? setModalOpen(false) : false;
      });
    };
  }, []);

  // 🚀 METHODS: ===============================
  const toggle = () => setModalOpen(prev => !prev);

  // 🚀 RENDER: ================================
  return <div className='modal-window'>
    <h1 className='title modal-window__title'>Modal Window</h1>
    <button className='button button--green' onClick={toggle}>Open Modal</button>
    <Modal modalOpen={modalOpen} handleClick={toggle}>
      <button className='close' onClick={toggle}>
        <FiX size={25} />
      </button>
      <h4>Modal Title</h4>
      <p>Dummy data</p>
      <button className='button button--fluid button--red' onClick={toggle}>Close</button>
    </Modal>
  </div>;
};

export default ModalWindow;
