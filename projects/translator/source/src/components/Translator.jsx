import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiClipboard, FiRefreshCw, FiVolume2 } from 'react-icons/all.js';
import mock from '../mock/mock.js';

const Translator = () => {
  const [textFrom, setTextFrom] = useState('');
  const [textTo, setTextTo] = useState('');
  const [selectFrom, setSelectFrom] = useState('en-GB');
  const [selectTo, setSelectTo] = useState('ru-RU');
  const [btnLabel, setBtnLabel] = useState('Translate Text');

  // 🚀 METHODS: ================================

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

  const onSwitch = () => {
    const tmpText = textFrom;
    const tmpSelect = selectFrom;

    setTextFrom(textTo);
    setTextTo(tmpText);

    setSelectFrom(selectTo);
    setSelectTo(tmpSelect);
  };

  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  };

  const onSpeech = (text, lang) => {
    const speechConfig = new SpeechSynthesisUtterance(text);
    speechConfig.lang = lang;
    speechSynthesis.speak(speechConfig);
  };

  // 🚀 RENDER: ================================
  return <div className='translator'>
    <h1 className='title translator__title'>Translator Mini</h1>
    <div className='translator__body'>
      <div className='translator__top'>
            <textarea placeholder='Enter text' value={textFrom}
                      onChange={({ target: { value } }) => setTextFrom(value)} />
        <textarea placeholder='Translation' readOnly disabled value={textTo} />
      </div>

      <div className='translator__controls controls'>
        <div className='controls__from'>
          <button className='button button--blue' onClick={() => onCopy(textFrom)}><FiClipboard size={20} /></button>
          <button className='button button--green'  onClick={() => onSpeech(textFrom, selectFrom)}><FiVolume2 size={20} /></button>
          <select name='from' value={selectFrom}
                  onChange={({ target: { value } }) => setSelectFrom(value)}>
            {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
          </select>
        </div>

        <div className='controls__switch'>
          <button className='button button--fluid' onClick={onSwitch}><FiRefreshCw size={20} /></button>
        </div>

        <div className='controls__to'>
          <select name='to' value={selectTo}
                  onChange={({ target: { value } }) => setSelectTo(value)}>
            {mock.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
          </select>
          <button className='button button--green' onClick={() => onSpeech(textTo, selectTo)}><FiVolume2 size={20} /></button>
          <button className='button button--blue' onClick={() => onCopy(textTo)}><FiClipboard size={20} /></button>
        </div>
      </div>

      <button className='button button--primary button--fluid translator__button' onClick={onTranslate}>{btnLabel}</button>
    </div>
  </div>;
};

export default Translator;
