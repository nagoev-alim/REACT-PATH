import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент формы для поиска веб-API.
 * @function
 * @name Form
 * @description Этот компонент представляет собой форму, позволяющую пользователю искать веб-API.
 */
const Form = () => {
  const { handleSearchByTitle } = useAppContext();

  /**
   * Обработчик отправки формы для выполнения поиска веб-API.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>} - Обещание, представляющее завершение операции.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim().toLowerCase();
    if (query.length === 0) {
      toast.error('Please fill the field.');
      return;
    }
    await handleSearchByTitle(query);
  }

  return (
    <form className='grid gap-2 bg-white border rounded p-3' onSubmit={handleSubmit}>
      <h1 className='text-lg text-center font-bold'>Search APIs</h1>
      <input className='input' type='text' name='query' placeholder='Enter keywords' />
      <button className='btn' type='submit'>Search</button>
    </form>
  );
};

export default Form;
