import { useState } from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'qrcode';
import { DotWave } from '@uiball/loaders';

const QRCodeGenerator02 = () => {
  const [btnText, setBtnText] = useState('Generate QR Code');
  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 METHODS: ================================
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, size } = Object.fromEntries(new FormData(form).entries());

    setIsLoading(false);
    setBtnText('Generate QR Code');

    if (text.trim().length === 0 || size.length === 0) {
      toast.error('Please fill the fields.');
      setResultUrl(null);
      return;
    }

    try {
      setIsLoading(true);
      setBtnText('Generating QR Code...');
      setResultUrl(await QRCode.toDataURL(text, {
        width: Number(size),
        height: Number(size),
      }));
      setBtnText('Generate QR Code');
      setIsLoading(false);
    } catch (e) {
      setBtnText('Generate QR Code');
      setIsLoading(false);
      setResultUrl(null);
      console.log(e);
    }
  };

  async function onSave() {
    const image = await fetch(resultUrl);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'QRCode';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 🚀 RENDER: ================================
  return <>
    <form onSubmit={onSubmit}>
      <label>
        <span>Paste a url or enter text to create QR code</span>
        <input type='text' name='text' placeholder='Enter text or url' />
      </label>
      <select name='size'>
        <option value=''>Select Size</option>
        {Array.from({ length: 7 }, (v, i) => (i + 1) * 100)
          .map((n, idx) =>
            <option key={idx} value={n}>{n}x{n}</option>,
          )}
      </select>
      <button className='button button--primary button--fluid' type='submit'>{btnText}</button>
    </form>

    {isLoading && <div className='loader'>
      <DotWave size={47} speed={1} color='black' />
      <p>Loading</p>
    </div>}

    {resultUrl && !isLoading && <div className='qr__result'>
      <img src={resultUrl} alt='QR Code' />
      <button className='button button--green' onClick={onSave}>Save</button>
    </div>}
  </>;
};

export default QRCodeGenerator02;
