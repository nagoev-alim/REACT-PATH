import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { DotWave } from '@uiball/loaders';

/**
 * Компонент генерации QR-кода.
 * @function
 * @name QrCodeGenerator01
 * @description Компонент для создания QR-кода на основе введенного текста и выбранного размера.
 */
const QrCodeGenerator01 = () => {
  const [btnText, setBtnText] = useState<string>('Generate QR Code');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Обработчик события отправки формы.
   * @param {FormEvent} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent): void {
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

    setBtnText('Generating QR Code...');
    setIsLoading(true);

    setTimeout(() => {
      setResultUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}`);
      setBtnText('Generate QR Code');
      setIsLoading(false);
    }, 1500);
  }

  /**
   * Обработчик для сохранения QR-кода.
   * @returns {Promise<void>} Промис, который выполняется при сохранении.
   */
  async function handleSave(): Promise<void> {
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

  return (
    <div className='grid gap-3'>
      <form className='grid gap-3' onSubmit={handleSubmit}>
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
        <div className='grid place-items-center gap-2'>
          <DotWave size={47} speed={1} color='black' />
          <p>Loading</p>
        </div>
      )}

      {resultUrl && !isLoading && (
        <div className='grid gap-2'>
          <img className='mx-auto' src={resultUrl} alt='QR Code' />
          <button className='btn' onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator01;
