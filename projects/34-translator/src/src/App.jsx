import { useState } from 'react';
import { FiClipboard, FiGithub, FiRefreshCw, FiVolume2 } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import mock from './mock/mock.js';
import axios from 'axios';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [textFrom, setTextFrom] = useState('');
  const [textTo, setTextTo] = useState('');
  const [selectFrom, setSelectFrom] = useState('en-GB');
  const [selectTo, setSelectTo] = useState('ru-RU');
  const [btnLabel, setBtnLabel] = useState('Translate Text');

  // =====================
  // 🚀 Methods
  // ====================
  /**
   * @function onTranslate - Translate text
   * @returns {Promise<void>}
   */
  const onTranslate = async () => {
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
  };

  /**
   * @function onSwitch - Switch languages
   */
  const onSwitch = () => {
    const tmpText = textFrom;
    const tmpSelect = selectFrom;

    setTextFrom(textTo);
    setTextTo(tmpText);

    setSelectFrom(selectTo);
    setSelectTo(tmpSelect);
  };

  /**
   * @function onCopy - Copy to clipboard
   * @param text
   */
  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  };

  /**
   * @function onSpeech - Speech text
   * @param text
   * @param lang
   */
  const onSpeech = (text, lang) => {
    const speechConfig = new SpeechSynthesisUtterance(text);
    speechConfig.lang = lang;
    speechSynthesis.speak(speechConfig);
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='translator'>
        <h1 className='title'>Translator</h1>

        <div className='translator__body'>
          <div className='translator__top'>
            <textarea placeholder='Enter text' value={textFrom}
                      onChange={({ target: { value } }) => setTextFrom(value)} />
            <textarea placeholder='Translation' readOnly disabled value={textTo} />
          </div>

          <div className='translator__controls controls'>
            <div className='controls__from'>
              <button onClick={() => onCopy(textFrom)}><FiClipboard size={20} /></button>
              <button onClick={()=>onSpeech(textFrom, selectFrom)}><FiVolume2 size={20} /></button>
              <select name='from' value={selectFrom}
                      onChange={({ target: { value } }) => setSelectFrom(value)}>
                {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
              </select>
            </div>

            <div className='controls__switch'>
              <button className='button' onClick={onSwitch}><FiRefreshCw size={20} /></button>
            </div>

            <div className='controls__to'>
              <select name='to' value={selectTo}
                      onChange={({ target: { value } }) => setSelectTo(value)}>
                {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
              </select>
              <button onClick={()=>onSpeech(textTo, selectTo)}><FiVolume2 size={20} /></button>
              <button onClick={() => onCopy(textTo)}><FiClipboard size={20} /></button>
            </div>
          </div>

          <button className='button translator__button' onClick={onTranslate}>{btnLabel}</button>
        </div>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};


export default App;
