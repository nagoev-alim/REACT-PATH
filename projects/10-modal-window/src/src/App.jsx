import { useEffect, useState } from 'react';
import { FiGithub, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false);
    return () => {
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, [close]);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function open - Open modal
   */
  function open() {
    setModalOpen(true);
  }
  /**
   * @function close - Close modal
   */
  function close() {
    setModalOpen(false);
  }
  /**
   * @function handleEscKey - Escape key event handler
   */
  function handleEscKey({key}) {
    if (key === 'Escape') {
      close();
    }
  }

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <div className='npp'>
      <div className='npp-app'>
        <h1 className='title'>Modal Component</h1>
        <button onClick={open}>Open Modal</button>
        <AnimatePresence initial={false} mode='wait'>
          {modalOpen &&
            <Modal modalOpen={modalOpen} handleClose={close}>
              <button className='close' onClick={close}>
                <FiX size={25} />
              </button>
              <h2 className='title'>Modal Title</h2>
              <p>Dummy data</p>
              <button onClick={close}>Close</button>
            </Modal>
          }
        </AnimatePresence>
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>;
};

const animation = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    transform: 'scale(1.2)',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'all',
    visibility: 'visible',
    transform: 'scale(1)',
    transition: {
      duration: 0.2,
      delay: 0.3,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    transform: 'scale(1.2)',
  },
};


/**
 * @function Backdrop - Modal backdrop
 * @param children
 * @param onClick
 * @return {JSX.Element}
 * @constructor
 */
const Backdrop = ({ children, onClick }) => (
  <motion.div
    className='backdrop'
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

/**
 * @function Modal
 * @param handleClose
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const Modal = ({ handleClose, children }) => (
  <Backdrop onClick={handleClose}>
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className='modal'
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {children}
    </motion.div>
  </Backdrop>
);

export default App;
