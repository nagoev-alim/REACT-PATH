import { useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    generatePalette();
  }, []);

  // =====================
  // 🚀 Methods
  // ====================
  /**
   * @function generatePalette - Generate palette
   */
  const generatePalette = () => {
    const array = [];
    Array.from({ length: 32 }, (v, i) => i + 1)
      .forEach(() => array.push(`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`));
    setPalette(array);
  };

  /**
   * @function onCopy - Copy to clipboard
   */
  const onCopy = (color) => {
    navigator.clipboard.writeText(color);
    toast.success('Success copy to clipboard.');
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='rndcg'>
        <h1 className='title'>Random Color Generator</h1>
        <ul>
          {palette.length !== 0 && palette.map(i =>
            <li className='card' key={i} onClick={()=>onCopy(i)}>
              <div className='card__header' style={{ backgroundColor: i }}></div>
              <div className='card__body'>
                <h3 className='card__title'>{i}</h3>
              </div>
            </li>,
          )}
        </ul>
        <button className='button refresh__button' onClick={generatePalette}>Refresh Palette</button>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
