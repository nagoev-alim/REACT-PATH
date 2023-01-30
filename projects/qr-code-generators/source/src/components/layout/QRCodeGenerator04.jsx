import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRious from 'qrious';
import { DotWave } from '@uiball/loaders';

const QRCodeGenerator04 = () => {
  const [btnText, setBtnText] = useState('Generate QR Code');
  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const qrRef = useRef();

  useEffect(() => {
    (async () => {
      if (resultUrl !== null) {
        await new QRious({
          backgroundAlpha: 0.8,
          foreground: `${resultUrl.color}`,
          foregroundAlpha: 0.8,
          level: 'H',
          size: Number(resultUrl.size),
          value: resultUrl.text,
          element: qrRef.current.querySelector('canvas'),
        });
      }
    })();
  }, [resultUrl, qrRef]);

  // 🚀 METHODS: ================================
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, size, color } = Object.fromEntries(new FormData(form).entries());

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
      setResultUrl({ text, size, color });
      setBtnText('Generate QR Code');
      setIsLoading(false);
    } catch (e) {
      setBtnText('Generate QR Code');
      setResultUrl(null);
      setIsLoading(false);
      console.log(e);
    }
  };

  async function onSave() {
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // 🚀 RENDER: ================================
  return <>
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
      <button className='button button--primary button--fluid' type='submit'>{btnText}</button>
    </form>

    {isLoading && <div className='loader'>
      <DotWave size={47} speed={1} color='black' />
      <p>Loading</p>
    </div>}

    {resultUrl && !isLoading && <div className='qr__result'>
      <div ref={qrRef}>
        <canvas id='qrcode'></canvas>
      </div>
      <button className='button button--green' onClick={onSave}>Save</button>
    </div>}
  </>;
};

export default QRCodeGenerator04;
