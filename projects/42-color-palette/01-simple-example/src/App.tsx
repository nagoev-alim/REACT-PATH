import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, FormEvent, useState } from 'react';
import Values from 'values.js';
import { FiClipboard } from 'react-icons/fi';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Color Palette".
 */
const App = () => {
  Color;
  Generator;
  ".
  * /
  const App = () => {
    /**
     * Состояние, содержащее массив цветов палитры.
     *
     * @type {Array<{ hex: string, rgb: number[] }>}
     */
    const [list, setList] = useState(new Values('#2e2e2e').all(10));

    /**
     * Состояние, отслеживающее вводимое пользователем значение цвета.
     *
     * @type {string}
     */
    const [input, setInput] = useState<string>('');

    /**
     * Функция для преобразования HEX цвета в RGB.
     *
     * @param {string} hex - Значение HEX цвета.
     * @param {string} alpha - Прозрачность цвета (опционально).
     * @returns {string} - Строка, представляющая значение RGB цвета.
     */
    function hexToRGB(hex: string, alpha?: string): string {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return alpha ? `rgba(${r},${g},${b},${alpha})` : `rgb(${r},${g},${b})`;
    }

    /**
     * Функция для обработки отправки формы генерации цветов.
     *
     * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
     * @returns {void}
     */
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const color = (formData.get('color') as string).trim().toLowerCase();
      if (color.length === 0) {
        toast.error('Please fill the field.');
        return;
      }
      try {
        setList(new Values(color).all(10));
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
      }
    }

    /**
     * Функция для копирования цвета в буфер обмена.
     *
     * @param {string} hexColor - Значение HEX цвета.
     * @returns {void}
     */
    const handleCopy = (hexColor: string) => {
      navigator.clipboard.writeText(`${hexColor}`);
      toast.success('Color successfully copied.');
    };

    /**
     * Функция для обработки изменения значения ввода цвета.
     *
     * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения ввода.
     * @returns {void}
     */
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      const { value } = event.target as HTMLInputElement;
      setInput(value);
    }

    return (
      <div className='max-w-5xl w-full p-3 grid gap-5'>
        <h1 className='text-center font-bold text-4xl'>Color Palette</h1>
        <form className='grid gap-2 bg-white p-2 border rounded' onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            name='color'
            placeholder='Type a color ( rgb, hex, color name, etc. )'
            value={input}
            onChange={handleChange}
          />
          <button type='submit' className='btn'>Generate</button>
        </form>
        <ul className='grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
          {list.map(({ hex, rgb }, idx) =>
            <li key={idx} className='grid bg-white p-2 rounded border-2'>
              <div className='border rounded min-h-[100px]' style={{ backgroundColor: `rgb(${rgb})` }} />
              <div className='grid gap-1 py-2'>
                <p className='flex gap-1 items-center font-bold' onClick={() => handleCopy(`#${hex}`)}>
                  {`#${hex}`}
                  <FiClipboard size={20} />
                </p>
                <p className='flex gap-1 items-center font-bold' onClick={() => handleCopy(hexToRGB(hex))}>
                  {`${hexToRGB(`${hex}`)}`}
                  <FiClipboard size={20} />
                </p>
              </div>
            </li>,
          )}
        </ul>
        <Toaster position='bottom-center' />
      </div>
    );
  };

  export default App;
