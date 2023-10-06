import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, useState } from 'react';

/**
 * Список вариантов файлов для выбора.
 * @type {{ value: string, label: string }[]}
 */
const mock: { value: string; label: string }[] = [
  { value: 'text/plain', label: 'Text File (.txt)' },
  { value: 'text/javascript', label: 'JS File (.js)' },
  { value: 'text/html', label: 'HTML File (.html)' },
  { value: 'image/svg+xml', label: 'SVG File (.svg)' },
  { value: 'application/msword', label: 'Doc File (.doc)' },
  { value: 'application/vnd.ms-powerpoint', label: 'PPT File (.ppt)' },
];

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Save text as File".
 */
const App = () => {
  /**
   * Выбранный тип файла.
   * @type {string}
   */
  const [selected, setSelected] = useState<string>(mock[0].value);

  /**
   * Метка для кнопки сохранения.
   * @type {string}
   */
  const [btnLabel, setBtnLabel] = useState<string>(`${mock[0].label.split(' ')[0]}`);

  /**
   * Текст, который нужно сохранить как файл.
   * @type {string}
   */
  const [text, setText] = useState<string>('It\'s Only After We\'ve Lost Everything That We\'re Free To Do Anything.');

  /**
   * Имя файла.
   * @type {string}
   */
  const [name, setName] = useState<string>('');

  /**
   * Обработчик выбора типа файла.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения выбора типа файла.
   * @returns {void}
   */
  function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setBtnLabel(`${mock.find(item => item.value === value).label.split(' ')[0]}`);
    setSelected(value);
  }

  /**
   * Обработчик сохранения файла.
   *
   * @returns {void}
   */
  function handleSubmit(): void {
    if (name.length === 0) {
      toast.error('Please fill a text field.');
      return;
    }
    const blob = new Blob([text], { type: selected });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  }

  /**
   * Обработчик изменения текста.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения текста.
   * @returns {void}
   */
  function handleText(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setText(value);
  }

  /**
   * Обработчик изменения имени файла.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения имени файла.
   * @returns {void}
   */
  function handleName(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setName(value);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Save Text As File</h1>
      <textarea className='input resize-none min-h-[140px]' spellCheck='false' placeholder='Enter something to save'
                value={text}
                onChange={handleText} />
      <label>
        <span>File name</span>
        <input className='input' type='text' placeholder='Enter file name' value={name} onChange={handleName} />
      </label>
      <label>
        <span>Save as</span>
        <select className='input' value={selected} onChange={handleSelect}>
          {mock.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <button className='btn' onClick={handleSubmit}>Save As {btnLabel} File</button>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
