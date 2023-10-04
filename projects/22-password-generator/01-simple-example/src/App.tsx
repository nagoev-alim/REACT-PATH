import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { CHARACTERS, MOCK } from './utils/constants.ts';
import zxcvbn from 'zxcvbn';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Password Generator".
 */
const App = () => {
  const [pwd, setPwd] = useState<{ password: string, length: number } | null>(null);
  const [length, setLength] = useState<number>(15);
  const [pwdStrong, setPwdStrong] = useState<string>('default');

  /**
   * Обработчик для генерации пароля с учетом выбранных параметров.
   */
  function handleGeneratePwd() {
    let params: {
      lowercase: boolean,
      uppercase: boolean,
      numbers: boolean,
      symbols: boolean,
      length: number
    } | null = null;
    // Извлечение параметров из DOM-элементов с атрибутом 'data-option'.
    document.querySelectorAll('[data-option]')
      .forEach(option => params = { ...params, [option.dataset.option]: option.checked });
    if (!Object.values(params).includes(true)) {
      toast.error('Please check minimum one option.');
      return;
    }
    setPwd({ password: handleGeneratePassword({ ...params, length }), length });
  }
  /**
   * Генерирует пароль на основе выбранных параметров.
   * @param {Object} options - Параметры для генерации пароля.
   * @param {boolean} options.lowercase - Использовать строчные буквы.
   * @param {boolean} options.uppercase - Использовать заглавные буквы.
   * @param {boolean} options.numbers - Использовать цифры.
   * @param {boolean} options.symbols - Использовать символы.
   * @param {number} options.length - Длина пароля.
   * @returns {string} Сгенерированный пароль.
   */
  function handleGeneratePassword({ lowercase, uppercase, numbers, symbols, length }: {
    lowercase: boolean,
    uppercase: boolean,
    numbers: boolean,
    symbols: boolean,
    length: number
  }) {
    let result = '';
    const typesCount = lowercase + uppercase + numbers + symbols;
    const typesArray = [{ lowercase }, { uppercase }, { numbers }, { symbols }].filter(i => Object.values(i)[0]);
    if (typesCount === 0) return '';
    for (let i = 0; i < length; i += typesCount) {
      typesArray.forEach(t => result += CHARACTERS[Object.keys(t)[0]]());
    }
    const pwdStrong = zxcvbn(result.slice(0, length)).score;
    setPwdStrong(
      pwdStrong === 0 ? 'v-weak'
        : pwdStrong === 1 ? 'weak'
          : pwdStrong === 2 ? 'fear'
            : pwdStrong === 3 ? 'medium'
              : pwdStrong === 4 ? 'strong' : 'default',
    );
    return result.slice(0, length);
  }
  /**
   * Обработчик для копирования сгенерированного пароля в буфер обмена.
   */
  function handleCopy() {
    if (pwd === null) return;
    const textarea = document.createElement('textarea');
    textarea.value = pwd.password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    toast.success('Password copied to clipboard.');
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Password Generator</h1>
      <div className='relative'>
        <input className='w-full border rounded py-2 px-3 pr-8 text-lg tracking-wider' type='text'
               defaultValue={pwd ? pwd.password : null} readOnly={true} disabled />
        <button className='absolute right-1 top-1/2 -translate-y-1/2' onClick={handleCopy}><FiClipboard size={25} />
        </button>
      </div>

      <div className={`rounded h-2 bg-gray-100 border indicator indicator--${pwdStrong}`}></div>

      <div className=''>
        <div className='flex gap-1 justify-between items-center'>
          <span className='font-medium text-sm'>Password Length</span>
          <span>{length}</span>
        </div>
        <input className='w-full range' type='range' defaultValue={15} min='1' max='30' step='1'
               onChange={({ target: { value } }) => setLength(Number(value))} />
      </div>

      <ul className='grid gap-3 sm:grid-cols-2'>
        {MOCK.map(({ name, label }, idx) =>
          <li key={idx}>
            <label className='flex items-center'>
              <input className='visually-hidden' type='checkbox' data-option={name} defaultChecked={idx === 0} />
              <span className='checkbox'></span>
              <span className='label'>{label}</span>
            </label>
          </li>,
        )}
      </ul>
      <button className='btn' onClick={handleGeneratePwd}>Generate Password</button>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
