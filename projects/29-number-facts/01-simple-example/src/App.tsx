import { toast, Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { DotWave } from '@uiball/loaders';
import { HiOutlineClipboardCopy } from 'react-icons/hi';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние для отслеживания загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Состояние для хранения полученного факта о числе.
   * @type {string | null}
   */
  const [fact, setFact] = useState<string | null>(null);

  /**
   * Функция-обработчик события отправки формы.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const number = parseInt(formData.get('number') as string, 10);
    if (number === 0) {
      toast.error('Please enter a number.');
      return;
    }
    try {
      setIsLoading(true);
      setFact(null);
      const { data } = await axios.get(`http://numbersapi.com/${number}`);
      setFact(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
    form.reset();
  }

  /**
   * Функция для копирования факта в буфер обмена.
   */
  function handleCopy(): void {
    if (typeof fact === 'string') {
      navigator.clipboard.writeText(fact);
      toast.success('Success copy to clipboard.');
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Number Facts</h1>
      <form onSubmit={handleSubmit}>
        <input className='input' type='number' name='number' placeholder='Enter a number' />
      </form>
      {fact && (
        <div className='grid items-start grid-cols-[1fr_100px] gap-2'>
          <p className='fact'>{fact}</p>
          <button className='btn max-w-max ml-auto' onClick={handleCopy}><HiOutlineClipboardCopy /></button>
        </div>
      )}
      {isLoading && (
        <div className='grid place-items-center'>
          <DotWave size={47} speed={1} color='black' />
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
