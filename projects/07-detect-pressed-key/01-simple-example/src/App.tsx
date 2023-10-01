import { FC, useEffect, useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "".
 */
const App: FC = () => {
  /**
   * Состояние клавиши и её кода.
   *
   * @type {Object}
   * @property {string} key - Нажатая клавиша (если не пробел, то отображается как "Space").
   * @property {string} keyCode - Код нажатой клавиши.
   */
  const [key, setKey] = useState<{
    key: string;
    keyCode: string
  } | null>(null);

  useEffect(function() {
    window.addEventListener('keydown', handleKeyDown);
    return function() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * Обработчик события нажатия клавиши.
   *
   * @param {KeyboardEvent} event - Объект события клавиши.
   */
  function handleKeyDown(event: KeyboardEvent) {
    const { key, keyCode } = event;
    setKey({ key: key === ' ' ? 'Space' : key, keyCode });
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md md:max-w-lg w-full p-3 grid gap-5'>
      {!key
        ? (<h1 className='text-center font-bold text-4xl'>Press any key</h1>)
        : (<>
          <div className='grid gap-4'>
            <div className='grid gap-2 place-items-center'>
              <span
                className='inline-flex justify-center items-center text-red-400 uppercase font-bold text-4xl border-4 border-red-400 rounded-full w-[70px] h-[70px] md:w-[90px] md:h-[90px]'
                data-value='keyCode'>{key.keyCode}</span>
              <span className='uppercase font-bold text-2xl text-red-400 md:text-4xl' data-value='key'>{key.key}</span>
            </div>
            <div className='grid grid-cols-2 place-items-center'>
              <p className='font-bold md:text-2xl text-center w-full pr-1'>
                Key: <span className='font-normal' data-value='key'>{key.key}</span>
              </p>
              <p className='font-bold md:text-2xl text-center pl-1 border-l-2 border-slate-900 w-full'>
                Code: <span className='font-normal' data-value='keyCode'>{key.keyCode}</span>
              </p>
            </div>
          </div>
        </>)
      }
    </div>
  );
};

export default App;
