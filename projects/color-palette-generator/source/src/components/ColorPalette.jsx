import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ColorPalette = () => {
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    generatePalette();
  }, []);

  // 🚀 METHODS: ===============================

  const generatePalette = () => {
    const array = [];
    Array.from({ length: 32 }, (v, i) => i + 1)
      .forEach(() => array.push(`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`));
    setPalette(array);
  };

  const onCopy = (color) => {
    navigator.clipboard.writeText(color);
    toast.success('Success copy to clipboard.');
  };

  // 🚀 RENDER: ================================
  return <div className='palette'>
    <h1 className='title palette__title'>Color Palette Generator</h1>
    <ul>
      {palette.length !== 0 && palette.map(i =>
        <li className='card' key={i} onClick={() => onCopy(i)}>
          <div className='card__header' style={{ backgroundColor: i }}></div>
          <div className='card__body'>
            <h3 className='card__title h5'>{i}</h3>
          </div>
        </li>,
      )}
    </ul>
    <button className='button button--primary refresh__button' onClick={generatePalette}>Refresh Palette</button>
  </div>;
};

export default ColorPalette;
