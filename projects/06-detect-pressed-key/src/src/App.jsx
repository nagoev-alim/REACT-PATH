import { FiGithub } from 'react-icons/fi';
import { useEffect, useState } from 'react';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => (
  <>
    <div className='npp'>
      <div className='npp-app'>
        <DetectPressedKey />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>
);

export default App;


/**
 * @function DetectPressedKey
 * @return {JSX.Element}
 * @constructor
 */
const DetectPressedKey = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [key, setKey] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown', ({ key, keyCode }) => {
      setKey(() => ({
        key: key === ' ' ? 'Space' : key,
        keyCode,
      }));
    });
  }, []);
  // =====================
  // 🚀 Methods
  // =====================

  // =====================
  // 🚀 Render
  // =====================
  return key === null
    ? <p className='title'>Press any key</p>
    : <>
      <div className='top'>
        <span>{key.keyCode}</span>
        <span>{key.key}</span>
      </div>
      <div className='bottom'>
        <p><span>Key</span> <span>{key.key}</span></p>
        <p><span>Code</span> <span>{key.keyCode}</span></p>
      </div>
    </>;
};
