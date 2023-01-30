import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';


const QRCodeReader = () => {
  const [btnLabel, setBtnLabel] = useState('Upload QR Code to Read');
  const [text, setText] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const imageRef = useRef();
  const inputRef = useRef();

  // 🚀 METHODS: ================================

  const onChange = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await onScanner(file, formData);
  };

  const onScanner = async (file, formData) => {
    setBtnLabel('Scanning QR Code...');

    try {
      const { data } = await axios.post('https://api.qrserver.com/v1/read-qr-code/', formData);
      const { data: text } = data[0].symbol[0];
      setBtnLabel(text ? 'Upload QR Code to Scan' : 'Couldn\'t scan QR Code');

      if (!text) {
        toast.error('Couldn\'t scan QR Code.');
        onReset();
        return;
      }

      setText(text);
      imageRef.current.src = URL.createObjectURL(file);
      inputRef.current.value = null;
      setIsLoad(true);
    } catch (e) {
      toast.error('Couldn\'t scan QR Code.');
      onReset();
      console.log(e);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Success copy to clipboard.');
  };

  const onReset = () => {
    setText('');
    setIsLoad(false);
    inputRef.current.value = null;
    setBtnLabel('Upload QR Code to Scan');
  };

  // 🚀 RENDER: ================================
  return <div className={`qr-code ${isLoad ? 'is-show' : ''}`}>
    <h1 className='visually-hidden'>QR Code Reader</h1>

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
      <button className='button button--fluid button--red' onClick={onReset}>Close</button>
      <button className='button button--fluid button--green' onClick={onCopy}>Copy</button>
    </div>
  </div>;
};

export default QRCodeReader;
