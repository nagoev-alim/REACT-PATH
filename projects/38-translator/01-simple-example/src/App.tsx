import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, useState } from 'react';
import mock from './mock';
import axios from 'axios';
import { FiClipboard, FiRefreshCw, FiVolume2 } from 'react-icons/fi';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Translator Mini".
 */
const App = () => {
  /**
   * Состояние текста для перевода.
   * @type {string}
   */
  const [textFrom, setTextFrom] = useState<string>('');

  /**
   * Состояние переведенного текста.
   * @type {string}
   */
  const [textTo, setTextTo] = useState<string>('');

  /**
   * Состояние выбранного языка исходного текста.
   * @type {string}
   */
  const [selectFrom, setSelectFrom] = useState<string>('en-GB');

  /**
   * Состояние выбранного языка перевода.
   * @type {string}
   */
  const [selectTo, setSelectTo] = useState<string>('ru-RU');

  /**
   * Состояние метки для кнопки "Перевести текст".
   * @type {string}
   */
  const [btnLabel, setBtnLabel] = useState<string>('Translate Text');

  /**
   * Функция для выполнения перевода текста.
   *
   * @returns {Promise<void>}
   */
  async function handleTranslate(): Promise<void> {
    if (textFrom.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    try {
      setBtnLabel('Loading...');
      const { data: { responseData: { translatedText } } } = await axios.get(`https://api.mymemory.translated.net/get?q=${textFrom}&langpair=${selectFrom}|${selectTo}`);
      setTextTo(translatedText);
      setBtnLabel('Translate Text');
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  }

  /**
   * Функция для смены языка перевода.
   *
   * @returns {void}
   */
  function handleSwitch(): void {
    const tmpText = textFrom;
    const tmpSelect = selectFrom;
    setTextFrom(textTo);
    setTextTo(tmpText);
    setSelectFrom(selectTo);
    setSelectTo(tmpSelect);
  }

  /**
   * Функция для копирования текста в буфер обмена.
   *
   * @param {string} text - Текст, который нужно скопировать.
   * @returns {void}
   */
  function handleCopy(text: string): void {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  }

  /**
   * Функция для произношения текста.
   *
   * @param {string} text - Текст для произнесения.
   * @param {string} lang - Язык для произношения.
   * @returns {void}
   */
  function handleSpeech(text: string, lang: string): void {
    const speechConfig = new SpeechSynthesisUtterance(text);
    speechConfig.lang = lang;
    speechSynthesis.speak(speechConfig);
  }

  /**
   * Функция для обработки изменения текста в поле ввода.
   *
   * @param {ChangeEvent<HTMLTextAreaElement>} event - Событие изменения текста.
   * @returns {void}
   */
  function handleSetTextFrom(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target as HTMLTextAreaElement;
    setTextFrom(value);
  }

  /**
   * Функция для обработки изменения выбранного языка исходного текста.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения выбора языка.
   * @returns {void}
   */
  function handleSetSelectFrom(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setSelectFrom(value);
  }

  /**
   * Функция для обработки изменения выбранного языка перевода.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения выбора языка.
   * @returns {void}
   */
  function handleSetSelectTo(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setSelectTo(value);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-2xl w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Translator Mini</h1>
      <div className='grid gap-3'>
        <div className='grid gap-2 md:grid-cols-2'>
            <textarea
              className='input resize-none min-h-[140px]'
              placeholder='Enter text'
              value={textFrom}
              onChange={handleSetTextFrom}
            />
          <textarea
            className='input resize-none min-h-[140px] disabled:opacity-60 disabled:cursor-not-allowed'
            placeholder='Translation'
            readOnly
            disabled
            value={textTo}
          />
        </div>

        <div className='grid gap-2 md:grid-cols-[1fr_auto_1fr]'>
          <div className='grid grid-cols-[auto_auto_1fr] gap-1'>
            <button className='btn' onClick={() => handleCopy(textFrom)}>
              <FiClipboard size={20} />
            </button>
            <button className='btn' onClick={() => handleSpeech(textFrom, selectFrom)}>
              <FiVolume2 size={20} />
            </button>
            <select className='input' name='from' value={selectFrom} onChange={handleSetSelectFrom}>
              {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
            </select>
          </div>

          <div className='grid place-items-center'>
            <button className='btn' onClick={handleSwitch}>
              <FiRefreshCw size={20} />
            </button>
          </div>

          <div className='grid grid-cols-[1fr_auto_auto] gap-1'>
            <select className='input' name='to' value={selectTo} onChange={handleSetSelectTo}>
              {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
            </select>
            <button className='btn' onClick={() => handleSpeech(textTo, selectTo)}>
              <FiVolume2 size={20} />
            </button>
            <button className='btn' onClick={() => handleCopy(textTo)}>
              <FiClipboard size={20} />
            </button>
          </div>
        </div>

        <button className='btn' onClick={handleTranslate}>{btnLabel}</button>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
