import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiImage } from 'react-icons/fi';

const Resizer = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lock, setLock] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [ratio, setRatio] = useState(null);
  const [btnLabel, setBtnLabel] = useState('Download Image');
  const imageRef = useRef();
  const inputRef = useRef();

  // 🚀 METHODS: ================================
  const onChange = async (file) => {
    if (!file) return;
    imageRef.current.classList.remove('visually-hidden');
    imageRef.current.src = URL.createObjectURL(file);
    imageRef.current.addEventListener('load', () => {
      setIsLoad(true);
      setWidth(imageRef.current.naturalWidth);
      setHeight(imageRef.current.naturalHeight);
      setRatio(imageRef.current.naturalWidth / imageRef.current.naturalHeight);
    });
  };

  const onDownload = () => {
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
  };

  const onWidthChange = ({ target: { value } }) => {
    setWidth(value);
    setHeight(Math.floor(lock ? value / ratio : height));
  };

  const onHeightChange = ({ target: { value } }) => {
    setHeight(value);
    setWidth(Math.floor(lock ? value * ratio : width));
  };

  // 🚀 RENDER: ================================
  return <div className='image-resizer'>
    <h1 className='title image-resizer__title'>Image Resizer</h1>
    <div className={`resizer ${isLoad ? 'is-active' : ''}`}>
      <div className='container' onClick={() => inputRef.current.click()}>
        <input type='file' accept='image/*' className='visually-hidden'
               ref={inputRef}
               onChangeCapture={({ target: { files } }) => onChange(files[0])}
        />
        <FiImage size={48} />
        <img className='visually-hidden' src='#' alt='image' ref={imageRef} />
        <p>Browse File to Upload</p>
      </div>
      <div className='content'>
        <label>
          <span>Width</span>
          <input type='number'
                 value={width} onChange={onWidthChange} />
        </label>
        <label>
          <span>Height</span>
          <input type='number'
                 value={height} onChange={onHeightChange} />
        </label>
        <label>
          <input className='visually-hidden input-box' type='checkbox'
                 checked={lock}
                 onChange={() => setLock(!lock)}
          />
          <span className='checkbox'></span>
          <span>Lock aspect ratio</span>
        </label>
        <label>
          <input className='visually-hidden input-box' type='checkbox'
                 checked={reduce}
                 onChange={() => setReduce(!reduce)}
          />
          <span className='checkbox'></span>
          <span>Reduce quality</span>
        </label>
        <button className='button button--fluid button--green' onClick={onDownload}>{btnLabel}</button>
      </div>
    </div>
  </div>;
};

export default Resizer;
