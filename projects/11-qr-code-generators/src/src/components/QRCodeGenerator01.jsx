import { toast } from 'react-hot-toast';
import { useState } from 'react';

const QRCodeGenerator01 = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [btnText, setBtnText] = useState('Generate QR Code');
  const [resultUrl, setResultUrl] = useState(null);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, size } = Object.fromEntries(new FormData(form).entries());

    if (text.trim().length === 0 || size.length === 0) {
      toast.error('Please fill the fields.');
      setResultUrl(null);
      return;
    }

    setBtnText('Generating QR Code...');
    setResultUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}`);
    setBtnText('Generate QR Code');
  };

  /**
   * @function onSave - Create and save image
   * @returns {Promise<void>}
   */
  const onSave = async () => {
    const image = await fetch(resultUrl);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'QRCode';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='qr-code'>
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
      <button type='submit'>{btnText}</button>
    </form>

    {resultUrl !== null && (
      <div className='bottom'>
        <img src={resultUrl} alt='QR Code' />
        <button onClick={onSave}>Save</button>
      </div>
    )}
  </div>;
};

export default QRCodeGenerator01;
