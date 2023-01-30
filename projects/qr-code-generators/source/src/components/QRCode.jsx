import { useState } from 'react';
import {
  QRCodeGenerator01,
  QRCodeGenerator02,
  QRCodeGenerator03,
  QRCodeGenerator04,
  QRCodeGenerator05,
} from './index.js';


const QRCode = () => {
  const [selected, setSelected] = useState(null);

  // 🚀 METHODS: ================================
  const onChange = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      setSelected(null);
      return;
    }
    setSelected(value);
  };

  // 🚀 RENDER: ================================
  return <div className='qr'>
    <h1 className='title qr__title'>QR Generators</h1>

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

    {selected && <div className='qr__body'>
      {selected === 'type01' && <QRCodeGenerator01 />}
      {selected === 'type02' && <QRCodeGenerator02 />}
      {selected === 'type03' && <QRCodeGenerator03 />}
      {selected === 'type04' && <QRCodeGenerator04 />}
      {selected === 'type05' && <QRCodeGenerator05 />}
    </div>}
  </div>;
};

export default QRCode;
