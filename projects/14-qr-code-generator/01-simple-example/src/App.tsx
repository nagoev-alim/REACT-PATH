import { ChangeEvent, FC, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  QRCodeGenerator01,
  QRCodeGenerator02,
  QRCodeGenerator03,
  QRCodeGenerator04,
  QRCodeGenerator05,
} from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "QR Code Generator".
 */
const App: FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const onChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target as HTMLSelectElement;
    if (value.trim().length === 0) {
      setSelected(null);
      return;
    }
    setSelected(value);
  };
  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>QR Generators</h1>
      <select className='input' onChange={onChange}>
        <option value=''>Select QR Generator</option>
        {[
          { name: 'type01', text: 'QR Generator 01 (api.qrserver.com)' },
          { name: 'type02', text: 'QR Generator 02 (node-qrcode)' },
          { name: 'type03', text: 'QR Generator 03 (qrcode.react)' },
          { name: 'type04', text: 'QR Generator 04 (QRious)' },
          { name: 'type05', text: 'QR Generator 05 (react-qr-code)' },
        ].map(({ name, text }, idx) => <option key={idx} value={name}>{text}</option>)}
      </select>

      {selected && (
        <div className='qr__body'>
          {selected === 'type01' && <QRCodeGenerator01 />}
          {selected === 'type02' && <QRCodeGenerator02 />}
          {selected === 'type03' && <QRCodeGenerator03 />}
          {selected === 'type04' && <QRCodeGenerator04 />}
          {selected === 'type05' && <QRCodeGenerator05 />}
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
