import { useRef, useState } from 'react';
import { FiGithub, FiImage } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lock, setLock] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [ratio, setRatio] = useState(null);
  const [btnLabel, setBtnLabel] = useState('Download Image');
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

    imageRef.current.classList.remove('visually-hidden');
    imageRef.current.src = URL.createObjectURL(file);

    imageRef.current.addEventListener('load', () => {
      setIsLoad(true);
      setWidth(imageRef.current.naturalWidth);
      setHeight(imageRef.current.naturalHeight);
      setRatio(imageRef.current.naturalWidth / imageRef.current.naturalHeight);
    });
  };

  /**
   * @function onDownload - Download image
   */
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

  /**
   * @function onWidthChange - Width input change handler
   * @param value
   */
  const onWidthChange = ({ target: { value } }) => {
    setWidth(value)
    setHeight(Math.floor(lock ? value / ratio : height));
  };

  /**
   * @function onHeightChange - Height input change handler
   * @param value
   */
  const onHeightChange = ({ target: { value } }) => {
    setHeight(value)
    setWidth(Math.floor(lock ? value * ratio : width));
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='image-resizer'>
        <h1 className='title'>Image Resizer</h1>
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
            <button className='button' onClick={onDownload}>{btnLabel}</button>
          </div>
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
