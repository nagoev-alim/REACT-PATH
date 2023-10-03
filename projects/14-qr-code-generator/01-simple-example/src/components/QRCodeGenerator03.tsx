import { FormEvent, useRef, useState } from 'react';
import { DotWave } from '@uiball/loaders';
import { toast } from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';

/**
 * Компонент генерации QR-кода.
 * @function
 * @name QrCodeGenerator03
 * @description Компонент для создания QR-кода на основе введенного текста и выбранного размера.
 */
const QrCodeGenerator03 = () => {
  const [btnText, setBtnText] = useState<string>('Generate QR Code');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const codeRef = useRef<HTMLDivElement | null>(null);

  /**
   * Обработчик события отправки формы.
   * @async
   * @param {FormEvent} event - Событие отправки формы.
   */
  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get('text') as string;
    const size = formData.get('size') as string;
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
      setResultUrl({ text, size: Number(size) });
      setBtnText('Generate QR Code');
      setIsLoading(false);
    } catch (e) {
      setBtnText('Generate QR Code');
      setResultUrl(null);
      setIsLoading(false);
      console.log(e);
    }
  }

  /**
   * Обработчик для сохранения QR-кода.
   * @async
   */
  async function onSave(): Promise<void> {
    const canvas = codeRef.current.querySelector('canvas');
    const image = canvas?.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <div className='grid gap-3'>
      <form className='grid gap-2' onSubmit={handleSubmit}>
        <label className='grid gap-1'>
          <span className='text-sm font-medium'>Paste a url or enter text to create QR code</span>
          <input className='input' type='text' name='text' placeholder='Enter text or url' />
        </label>
        <select className='input' name='size'>
          <option value=''>Select Size</option>
          {Array.from({ length: 7 }, (_v, i) => (i + 1) * 100)
            .map((n, idx) => <option key={idx} value={n}>{n}x{n}</option>)}
        </select>
        <button className='btn' type='submit'>{btnText}</button>
      </form>

      {isLoading && (
        <div className='grid place-items-center gap-3'>
          <DotWave size={47} speed={1} color='black' />
          <p>Loading</p>
        </div>
      )}

      {resultUrl && !isLoading && (
        <div className='grid gap-3'>
          <div className='mx-auto h-[250px] w-[250px]' ref={codeRef}>
            <QRCodeCanvas
              value={resultUrl.text}
              size={resultUrl.size}
              bgColor={'#fff'}
              level={'H'}
              className='h-full'
            />
          </div>
          <button className='btn' onClick={onSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator03;
