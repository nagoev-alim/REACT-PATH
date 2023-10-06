import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Ping } from '@uiball/loaders';
import { FiClipboard, FiTrash2 } from 'react-icons/fi';

/**
 * Интерфейс для представления данных URL.
 * @interface
 * @name Data
 */
interface Data {
  url: string;
  id: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "URL Shortener".
 */
const App = () => {
  /**
   * Состояние для отслеживания процесса загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Состояние для хранения данных URL.
   * @type {Data[]}
   */
  const [data, setData] = useState<Data[] | []>([]);

  /**
   * Функция для обработки отправки формы с URL-ссылкой.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const url = formData.get('url') as string;
    if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(url.trim()) || url.trim().length === 0) {
      toast.error('Please select validate URL.');
      return;
    }
    setIsLoading(false);
    try {
      const {
        data: {
          ok,
          result: { full_short_link },
        },
      } = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`);
      if (!ok) {
        toast.error('Something went wrong, open dev console.');
        return;
      }
      setData(v => [...v, { url: full_short_link, id: uuidv4() }]);
      setIsLoading(true);
    } catch (e) {
      setIsLoading(false);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  }

  /**
   * Функция для копирования URL в буфер обмена.
   * @param {string} url - URL-ссылка.
   * @returns {void}
   */
  function handleCopy(url: string): void {
    navigator.clipboard.writeText(url);
    toast.success('URL copied successfully to clipboard.');
  }

  /**
   * Функция для удаления URL из списка.
   * @param {string} id - Идентификатор URL.
   * @returns {void}
   */
  function handleDelete(id: string): void {
    if (confirm('Are you sure?')) {
      let copy = [...data];
      copy = copy.filter(item => item.id !== id);
      setData(copy);
      toast.success('URL successfully deleted.');
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>URL Shortener</h1>
      <form className='grid gap-3' onSubmit={handleSubmit}>
        <input className='input' type='text' name='url' placeholder='Paste a link to shorten it' />
        <button className='btn' type='submit'>Submit</button>
      </form>
      {!isLoading && (
        <div className='grid place-items-center'>
          <Ping size={45} speed={2} color='black' />
        </div>
      )}
      {data.length !== 0 &&
        <ul className='grid gap-3'>
          {data.map(({ id, url }) =>
            <li className='grid grid-cols-[1fr_60px_60px] gap-1' key={id}>
              <input className='input disabled:opacity-60 disabled:cursor-not-allowed' type='text' value={url} disabled
                     readOnly />
              <button className='btn' onClick={() => handleCopy(url)}>
                <FiClipboard size={25} />
              </button>
              <button className='btn' onClick={() => handleDelete(id)}>
                <FiTrash2 size={25} />
              </button>
            </li>,
          )}
        </ul>
      }
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
