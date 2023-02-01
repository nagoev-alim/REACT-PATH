import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const synth = window.speechSynthesis;

const TTS = () => {
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [btnLabel, setBtnLabel] = useState('Convert To Speech');
  const [speaking, setSpeaking] = useState(true);

  if (!synth) {
    return <span>Aw... your browser does not support Speech Synthesis</span>;
  }

  // 🚀 METHODS: ================================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const synth = window.speechSynthesis;
    const text = Object.fromEntries(new FormData(form).entries()).text.trim().toLowerCase();

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
  };

  // 🚀 RENDER: ================================
  return <div className='tts'>
    <h1 className='title tts__title'>TTS</h1>
    <form onSubmit={onSubmit}>
      <label>
        <span>Enter Text</span>
        <textarea name='text'></textarea>
      </label>
      <label>
        <span>Select Voice</span>
        <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
      </label>
      <button className='button button--fluid button--green'>{btnLabel}</button>
    </form>
  </div>;
};


const VoiceSelector = ({ selected = 0, setSelected }) => {
  const [voices, setVoices] = useState([]);
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

  // 🚀 RENDER: ================================
  return <select
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

export default TTS;
