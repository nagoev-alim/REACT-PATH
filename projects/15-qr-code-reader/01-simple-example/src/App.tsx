import { ChangeEvent, FC, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import axios from 'axios';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * * @description Главный компонент приложения "QR Code Reader".
 */
const App: FC = () => {
  // Состояния
  const [btnLabel, setBtnLabel] = useState('Upload QR Code to Read'); // Текст на кнопке загрузки QR-кода
  const [text, setText] = useState(''); // Текст QR-кода, прочитанный с изображения
  const [isLoad, setIsLoad] = useState(false); // Флаг загрузки и обработки QR-кода
  // Ссылки на элементы DOM
  const imageRef = useRef<HTMLImageElement | null>(null); // Ссылка на изображение QR-кода
  const inputRef = useRef<HTMLFormElement | null>(null); // Ссылка на элемент загрузки файла
  /**
   * Обработчик изменения выбранного файла. Запускает сканер QR-кодов.
   * @param {ChangeEvent} event - Событие изменения входного элемента
   */
  async function handleChange(event: ChangeEvent): Promise<void> {
    const { files } = event.target as HTMLInputElement;
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await handleScanner(file, formData);
  }

  /**
   * Сканирует QR-код с изображения.
   * @param {File} file - Загруженный файл с QR-кодом
   * @param {FormData} formData - Данные формы с файлом
   */
  async function handleScanner(file: File, formData: FormData): Promise<void> {
    setBtnLabel('Scanning QR Code...');
    try {
      const { data } = await axios.post('https://api.qrserver.com/v1/read-qr-code/', formData);
      const { data: text } = data[0].symbol[0];
      setBtnLabel(text ? 'Upload QR Code to Scan' : 'Couldn\'t scan QR Code');
      if (!text) {
        toast.error('Couldn\'t scan QR Code.');
        handleReset();
        return;
      }
      setText(text);
      imageRef.current.src = URL.createObjectURL(file);
      inputRef.current.value = null;
      setIsLoad(true);
    } catch (e) {
      toast.error('Couldn\'t scan QR Code.');
      handleReset();
      console.log(e);
    }
  }

  /**
   * Копирует текст QR-кода в буфер обмена и выводит уведомление об успешной копии.
   */
  function handleCopy(): void {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  }

  /**
   * Сбрасывает состояние приложения после завершения сканирования.
   */
  function handleReset(): void {
    setText('');
    setIsLoad(false);
    inputRef.current.value = null;
    setBtnLabel('Upload QR Code to Scan');
  }

  return (
    <div
      className={`bg-white max-w-md w-full border-2 rounded p-3 grid gap-3 h-[330px] overflow-hidden transition-all ${isLoad ? 'h-[550px]' : ''}`}>
      <h1 className='text-center font-bold text-4xl'>QR Code Reader</h1>
      <form
        className='h-[250px] w-full border-2 border-dashed border-black rounded-md grid place-items-center cursor-pointer'
        onClick={() => inputRef.current.click()}>
        <input type='file' className='visually-hidden' ref={inputRef} onChangeCapture={handleChange} />
        <img className={isLoad ? 'w-[200px] h-[200px]' : 'hidden'} ref={imageRef} src='#' alt='qr-code' />
        <div className={`grid gap-3 place-items-center ${isLoad ? 'hidden' : ''}`}>
          <FiUploadCloud size={50} />
          <p>{btnLabel}</p>
        </div>
      </form>
      <div className='grid gap-3 grid-cols-2'>
        <textarea
          className='input col-span-2 min-h-[140px] resize-none disabled:opacity-60 disabled:cursor-not-allowed'
          spellCheck='false'
          disabled
          value={text}
        />
        <button className='btn bg-red-400 text-white hover:bg-red-500' onClick={handleReset}>Close</button>
        <button className='btn bg-green-400 text-white hover:bg-green-500' onClick={handleCopy}>Copy</button>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
