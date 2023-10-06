import { toast, Toaster } from 'react-hot-toast';
import { FormEvent, useCallback, useEffect, useState } from 'react';

const synth = window.speechSynthesis;

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Text To Speech".
 */
const App = () => {
  /**
   * Состояние выбранного голоса.
   * @type {number}
   */
  const [selectedVoice, setSelectedVoice] = useState<number>(0);

  /**
   * Состояние метки для кнопки "Преобразовать в речь".
   * @type {string}
   */
  const [btnLabel, setBtnLabel] = useState<string>('Преобразовать в речь');

  /**
   * Состояние, отвечающее за состояние "речи" (воспроизведения).
   * @type {boolean}
   */
  const [speaking, setSpeaking] = useState<boolean>(true);

  if (!synth) {
    return <span>Aw... your browser does not support Speech Synthesis</span>;
  }

  /**
   * Функция для обработки отправки формы.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {void}
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get('text') as string;
    const synth = window.speechSynthesis;
    if (text.length === 0) {
      toast.error('Please enter or paste something.');
      return;
    }
    if (!synth.speaking) {
      let utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = synth.getVoices()[selectedVoice];
      synth.speak(utterance);
    }
    if (text.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !speaking) {
          setSpeaking(true);
          setBtnLabel('Convert To Speech');
        } else {
        }
      }, 500);
      if (speaking) {
        synth.resume();
        setSpeaking(false);
        setBtnLabel('Pause Speech');
      } else {
        synth.pause();
        setSpeaking(true);
        setBtnLabel('Resume Speech');
      }
    } else {
      setBtnLabel('Convert To Speech');
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Text To Speech</h1>
      <form className='grid gap-2' onSubmit={handleSubmit}>
        <label className='grid gap-1'>
          <span className='font-medium text-sm'>Enter Text</span>
          <textarea className='input' name='text' />
        </label>
        <label className='grid gap-1'>
          <span className='font-medium text-sm'>Select Voice</span>
          <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
        </label>
        <button className='btn'>{btnLabel}</button>
      </form>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

interface IVoiceSelectorProps {
  selected: number;
  setSelected: () => void;
}

/**
 * Компонент для выбора голоса.
 * @function
 * @name VoiceSelector
 *
 * @param {IVoiceSelectorProps} props - Свойства компонента VoiceSelector.
 * @returns {JSX.Element}
 */
const VoiceSelector = ({ selected = 0, setSelected }: IVoiceSelectorProps) => {
  const [voices, setVoices] = useState([]);
  /**
   * Функция для заполнения списка доступных голосов.
   * @function
   * @name populateVoiceList
   * @returns {void}
   */
  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices(newVoices);
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  return <select
    className='input'
    value={selected}
    onChange={({ target: value }) => setSelected(Number(value))}
  >
    {voices.map((voice, index) => (
      <option key={index} value={index}>
        {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
      </option>
    ))}
  </select>;
};
