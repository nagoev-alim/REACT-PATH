import { toast, Toaster } from 'react-hot-toast';
import { ChangeEvent, useRef, useState } from 'react';
import { FiImage } from 'react-icons/fi';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Image Resizer".
 */
const App = () => {
  /**
   * Состояние ширины изображения.
   * @type {number}
   */
  const [width, setWidth] = useState<number>(0);

  /**
   * Состояние высоты изображения.
   * @type {number}
   */
  const [height, setHeight] = useState<number>(0);

  /**
   * Состояние блокировки соотношения сторон изображения.
   * @type {boolean}
   */
  const [lock, setLock] = useState<boolean>(true);

  /**
   * Состояние уменьшения качества изображения.
   * @type {boolean}
   */
  const [reduce, setReduce] = useState<boolean>(false);

  /**
   * Состояние загрузки изображения.
   * @type {boolean}
   */
  const [isLoad, setIsLoad] = useState<boolean>(false);

  /**
   * Состояние соотношения сторон изображения.
   * @type {number | null}
   */
  const [ratio, setRatio] = useState<number | null>(null);

  /**
   * Состояние метки кнопки скачивания изображения.
   * @type {string}
   */
  const [btnLabel, setBtnLabel] = useState<string>('Download Image');

  /**
   * Ссылка на элемент изображения.
   * @type {React.RefObject<HTMLImageElement | null>}
   */
  const imageRef = useRef<HTMLImageElement | null>(null);

  /**
   * Ссылка на элемент ввода файла.
   * @type {React.RefObject<HTMLInputElement | null>}
   */
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Обработчик изменения входного файла изображения.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения входного файла.
   * @returns {Promise<void>}
   */
  async function handleChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const { files } = event.target as HTMLInputElement;
    const file = files[0];
    if (!file) return;
    if (imageRef.current !== null) {
      imageRef.current.classList.remove('visually-hidden');
      imageRef.current.src = URL.createObjectURL(file);
      imageRef.current.addEventListener('load', () => {
        setIsLoad(true);
        if (imageRef.current !== null) {
          setWidth(imageRef.current.naturalWidth);
          setHeight(imageRef.current.naturalHeight);
          setRatio(imageRef.current.naturalWidth / imageRef.current.naturalHeight);
        }
      });
    }
  }

  /**
   * Обработчик скачивания изображения.
   *
   * @returns {void}
   */
  function handleDownload(): void {
    setBtnLabel('Downloading...');
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');
    const imgQuality = reduce ? 0.6 : 1.0;
    canvas.width = width;
    canvas.height = height;
    setTimeout(() => {
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
      a.href = canvas.toDataURL('image/jpeg', imgQuality);
      a.download = new Date().getTime();
      a.click();
      setBtnLabel('Download Image');
      toast.success('Image successfully downloaded.');
    }, 1000);
  }

  /**
   * Обработчик изменения ширины изображения.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения ширины.
   * @returns {void}
   */
  function handleWidthChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setWidth(value);
    setHeight(Math.floor(lock ? value / ratio : height));
  }

  /**
   * Обработчик изменения высоты изображения.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения высоты.
   * @returns {void}
   */
  function handleHeightChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setHeight(value);
    setWidth(Math.floor(lock ? value * ratio : width));
  }

  /**
   * Обработчик блокировки/разблокировки соотношения сторон изображения.
   *
   * @returns {void}
   */
  function handleLock(): void {
    setLock(!lock);
  }

  /**
   * Обработчик уменьшения/увеличения качества изображения.
   *
   * @returns {void}
   */
  function handleReduce(): void {
    setReduce(!reduce);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Image Resizer</h1>
      <div className={`grid gap-2 h-[250px] overflow-auto transition-all ${isLoad ? 'h-[420px]' : ''}`}>
        <div
          className='cursor-pointer border-2 border-black border-dashed rounded h-[250px] grid place-content-center gap-1.5 place-items-center relative'
          onClick={() => inputRef.current.click()}
        >
          <input type='file' accept='image/*' className='visually-hidden' ref={inputRef}
                 onChangeCapture={handleChange} />
          <FiImage size={48} className={`${isLoad ? 'hidden' : ''}`} />
          <img className={`${isLoad ? ' absolute w-full h-full top-0 left-0 object-cover' : 'visually-hidden'}`} src='#'
               alt='image' ref={imageRef} />
          <p className={`${isLoad ? 'hidden' : ''}`}>Browse File to Upload</p>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <label className='grid gap-1'>
            <span className='font-medium'>Width</span>
            <input className='input' type='number' value={width} onChange={handleWidthChange} />
          </label>
          <label className='grid gap-1'>
            <span className='font-medium'>Height</span>
            <input className='input' type='number' value={height} onChange={handleHeightChange} />
          </label>
          <label className='flex items-center gap-2'>
            <input className='visually-hidden input-box' type='checkbox' checked={lock} onChange={handleLock} />
            <span className='checkbox'></span>
            <span className='font-medium'>Lock aspect ratio</span>
          </label>
          <label className='flex items-center gap-2'>
            <input className='visually-hidden input-box' type='checkbox' checked={reduce} onChange={handleReduce} />
            <span className='checkbox'></span>
            <span className='font-medium'>Reduce quality</span>
          </label>
          <button className='btn col-span-2' onClick={handleDownload}>{btnLabel}</button>
        </div>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
