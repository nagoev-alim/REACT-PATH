import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';

const QRCodeGenerator05 = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [btnText, setBtnText] = useState('Generate QR Code');
  const [resultUrl, setResultUrl] = useState(null);
  const qrRef = useRef();

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, size, color } = Object.fromEntries(new FormData(form).entries());

    if (text.trim().length === 0 || size.length === 0) {
      toast.error('Please fill the fields.');
      setResultUrl(null);
      return;
    }

    try {
      setBtnText('Generating QR Code...');
      setResultUrl({ text, size: Number(size), color });
      setBtnText('Generate QR Code');
    } catch (e) {
      setBtnText('Generate QR Code');
      setResultUrl(null);
      console.log(e);
    }
  };

  /**
   * @function onSave - Create and save image
   * @returns {Promise<void>}
   */
  async function onSave() {
    const svg = document.querySelector('.qr svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QRCode';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  // =====================
  // 🚀 Render
  // =====================
  return <div className='qr-code'>
    <form onSubmit={onSubmit}>
      <label>
        <span>Paste a url or enter text to create QR code</span>
        <input type='text' name='text' placeholder='Enter text or url' />
      </label>
      <label>
        <span>Select color</span>
        <input type='color' name='color' defaultValue='#333333' />
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
        <div className='qr' ref={qrRef}>
          <QRCode
            size={resultUrl.size}
            fgColor={resultUrl.color}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={resultUrl.text}
            viewBox={`0 0 ${resultUrl.size} ${resultUrl.size}`}
          />
        </div>
        <button onClick={onSave}>Save</button>
      </div>
    )}
  </div>;
};

export default QRCodeGenerator05;
