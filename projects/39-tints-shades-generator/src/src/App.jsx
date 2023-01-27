import { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import Values from 'values.js';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [color] = useState('#333333');
  const [palette, setPalette] = useState(new Values('#333333').all(10));

  // =====================
  // 🚀 Methods
  // ====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const query = Object.fromEntries(new FormData(form).entries()).color.trim().toLowerCase();

    if (query.length === 0) {
      toast.error('Please fill a valid color.');
      return;
    }

    try {
      setPalette(new Values(query).all(10));
    } catch (e) {
      console.log(e);
    }
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='generator'>
        <h1 className='title'>Tints and Shades Generator</h1>
        <form onSubmit={onSubmit}>
          <label>
            <input type='text' name='color' defaultValue={color} placeholder='#222222' />
          </label>
          <button className='button'>Submit</button>
        </form>

        <div className='palette'>
          {palette.length !== 0 && palette.map((color, idx) =>
            <Card
              key={idx}
              hexColor={color.hex}
              {...color}
            />,
          )}
        </div>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

/**
 * @function Card
 * @param hexColor
 * @param rgb
 * @param weight
 * @param type
 * @return {JSX.Element}
 * @constructor
 */
const Card = ({ hexColor, rgb, weight, type }) => {
  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onCopy - Copy on clipboard
   * @param value
   */
  const onCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.success('Success copy to clipboard.');
  };
  // =====================
  // 🚀 Render
  // =====================
  return <div
    className={`color ${type}`}
    style={{ backgroundColor: `rgb(${rgb.join(',')})` }}
    onClick={() => onCopy(`#${hexColor}`)}
  >
    <p>{weight}%</p>
    <p>{`#${hexColor}`}</p>
  </div>;
};


export default App;
