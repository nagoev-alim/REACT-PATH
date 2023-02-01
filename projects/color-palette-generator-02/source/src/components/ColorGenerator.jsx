import { useState } from 'react';
import Values from 'values.js';
import toast from 'react-hot-toast';
import { FiClipboard } from 'react-icons/all';

const ColorGenerator = () => {
  const [list, setList] = useState(new Values('#2e2e2e').all(10));
  const [input, setInput] = useState('');

  // 🚀 METHODS: ================================
  const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return alpha ? `rgba(${r},${g},${b},${alpha})` : `rgb(${r},${g},${b})`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const color = Object.fromEntries(new FormData(form).entries()).color.toLowerCase();
    if (color.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    try {
      setList(new Values(color).all(10));
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
    }
  };

  const onCopy = (hexColor, target) => {
    target.closest('.colors__item').classList.add('copied');
    setTimeout(() => target.closest('.colors__item').classList.remove('copied'), 1500);
    navigator.clipboard.writeText(`#${hexColor}`);
    toast.success('Color successfully copied.');
  };

  // 🚀 RENDER: ================================
  return <div className='colors'>
    <h1 className='title colors__title'>Color Generator</h1>
    <form className='colors__form' onSubmit={onSubmit}>
      <input type='text' name='color' placeholder='Type a color ( rgb, hex, color name, etc. )' value={input}
             onChange={({ target: { value } }) => setInput(value)} />
      <button type='submit' className='button button--primary'>Generate</button>
    </form>

    <ul className='colors__list'>
      {list.map(({ hex, rgb }, idx) =>
        <li key={idx} className='colors__item'>
          <div className='colors__item-header' style={{ backgroundColor: `rgb(${rgb})` }} />
          <div className='colors__item-body'>
            <p onClick={({ target }) => onCopy(hex, target)}>{`#${hex}`} <FiClipboard size={20} /></p>
            <p onClick={({ target }) => onCopy(hexToRGB(`#${hex}`), target)}>{`${hexToRGB(`#${hex}`)}`} <FiClipboard
              size={20} /></p>
          </div>
        </li>,
      )}
    </ul>
  </div>;
};

export default ColorGenerator;
