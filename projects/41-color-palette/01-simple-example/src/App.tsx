import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Color Palette".
 */
const App = () => {
  /**
   * Состояние, содержащее массив цветов палитры.
   *
   * @type {string[]}
   */
  const [palette, setPalette] = useState<string[] | []>([]);

  useEffect(() => {
    handleGenerate();
  }, []);

  /**
   * Функция для генерации новой цветовой палитры.
   *
   * @returns {void}
   */
  function handleGenerate(): void {
    const array: string[] = [];
    Array.from({ length: 32 }, (_v, i) => i + 1)
      .forEach(() => array.push(`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`));
    setPalette(array);
  }

  /**
   * Функция для копирования цвета в буфер обмена.
   *
   * @param {string} color - Код цвета для копирования.
   * @returns {void}
   */
  function handleCopy(color: string): void {
    navigator.clipboard.writeText(color);
    toast.success('Success copy to clipboard.');
  }

  return (
    <div className='max-w-5xl mx-auto w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Color Palette</h1>
      <ul className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {palette.length !== 0 && palette.map(i =>
          <li className='grid gap-1 cursor-pointer bg-white p-2 border-2 rounded' key={i} onClick={() => handleCopy(i)}>
            <div className='min-h-[150px] rounded' style={{ backgroundColor: i }} />
            <h3 className='font-bold uppercase'>{i}</h3>
          </li>,
        )}
      </ul>
      <button className='btn max-w-max mx-auto' onClick={handleGenerate}>Refresh Palette</button>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
