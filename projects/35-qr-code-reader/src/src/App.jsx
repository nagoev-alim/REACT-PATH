import { useRef, useState } from 'react';
import { FiGithub, FiUploadCloud } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
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
  const [btnLabel, setBtnLabel] = useState('Upload QR Code to Read');
  const [text, setText] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const imageRef = useRef();
  const inputRef = useRef();

  // =====================
  // 🚀 Methods
  // ====================
  /**
   * @function onChange - Input change event handler
   * @param file
   */
  const onChange = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await onScanner(file, formData);
  };

  /**
   * @function onScanner - Send file and get result
   * @param file
   * @param formData
   * @returns {Promise<void>}
   */
  const onScanner = async (file, formData) => {
    setBtnLabel('Scanning QR Code...');

    try {
      const { data } = await axios.post('https://api.qrserver.com/v1/read-qr-code/', formData);
      const { data: text } = data[0].symbol[0];
      setBtnLabel(text ? 'Upload QR Code to Scan' : 'Couldn\'t scan QR Code');

      if (!text) {
        toast.error('Couldn\'t scan QR Code.');
        onReset()
        return;
      }

      setText(text);
      imageRef.current.src = URL.createObjectURL(file);
      inputRef.current.value = null
      setIsLoad(true);
    } catch (e) {
      toast.error('Couldn\'t scan QR Code.');
      onReset()
      console.log(e);
    }
  };

  /**
   * @function onCopy - Copy to clipboard
   */
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  };

  /**
   * @function onReset - Set default states
   */
  const onReset = () => {
    setText('');
    setIsLoad(false);
    inputRef.current.value = null
    setBtnLabel('Upload QR Code to Scan');
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className={`qr-code ${isLoad ? 'is-show' : ''}`}>

        <form onClick={() => inputRef.current.click()}>
          <input type='file'
                 className='visually-hidden'
                 ref={inputRef}
                 onChangeCapture={({ target: { files } }) => onChange(files[0])} />
          <img ref={imageRef} src='#' alt='qr-code' />
          <div className={`${isLoad ? 'hide' : ''}`}>
            <FiUploadCloud size={20} />
            <p>{btnLabel}</p>
          </div>
        </form>

        <div className='content'>
          <textarea spellCheck='false' disabled value={text}></textarea>
          <button className='button' onClick={onReset}>Close</button>
          <button className='button' onClick={onCopy}>Copy</button>
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
