import { FiGithub } from 'react-icons/fi';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  QRCodeGenerator01,
  QRCodeGenerator02,
  QRCodeGenerator03,
  QRCodeGenerator04,
  QRCodeGenerator05,
} from './components/index.js';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [selected, setSelected] = useState(null);

  // =====================
  // 🚀 Methods
  // =====================
  const onChange = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      setSelected(null);
      return;
    }
    setSelected(value);
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <h1 className='title'>Select QR Code App</h1>

      <select onChange={onChange}>
        <option value=''>Select QR Generator</option>
        {[
          { name: 'type01', text: 'QR Generator 01 (api.qrserver.com)' },
          { name: 'type02', text: 'QR Generator 02 (node-qrcode)' },
          { name: 'type03', text: 'QR Generator 03 (qrcode.react)' },
          { name: 'type04', text: 'QR Generator 04 (QRious)' },
          { name: 'type05', text: 'QR Generator 05 (react-qr-code)' },
        ].map(({ name, text }, idx) => <option key={idx} value={name}>{text}</option>)}
      </select>

      {selected === 'type01' && <QRCodeGenerator01 />}
      {selected === 'type02' && <QRCodeGenerator02 />}
      {selected === 'type03' && <QRCodeGenerator03 />}
      {selected === 'type04' && <QRCodeGenerator04 />}
      {selected === 'type05' && <QRCodeGenerator05 />}
    </div>

    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
