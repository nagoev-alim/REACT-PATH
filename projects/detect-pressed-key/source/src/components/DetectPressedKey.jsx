import { useEffect, useState } from 'react';

const DetectPressedKey = () => {
  const [key, setKey] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown', ({ key, keyCode }) => {
      setKey(() => ({
        key: key === ' ' ? 'Space' : key,
        keyCode,
      }));
    });
  }, []);

  // 🚀 RENDER: ================================
  return <div className='detect'>
    {!key
      ? <h1 className='title detect__title'>Press any key</h1>
      : <>
        <div className='detect__top'>
          <span className='detect__top-code'>{key.keyCode}</span>
          <span className='detect__top-key'>{key.key}</span>
        </div>
        <div className='detect__bottom'>
          <p className='detect__bottom-row'><span>Key</span> <span>{key.key}</span></p>
          <p className='detect__bottom-row'><span>Code</span> <span>{key.keyCode}</span></p>
        </div>
      </>}
  </div>;
};

export default DetectPressedKey;
