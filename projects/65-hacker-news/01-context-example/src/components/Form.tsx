import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppContext } from '../context/AppContext.tsx';
import toast from 'react-hot-toast';

/**
 * React-компонент формы поиска.
 * @function
 * @name Form
 */
const Form = () => {
  const { query, searchStory } = useAppContext();

  /**
   * Состояние для хранения значения ввода поискового запроса.
   * @type {string}
   */
  const [q, setQ] = useState<string>(query);

  /**
   * Обработчик отправки формы поиска.
   * @function
   * @name handleSubmit
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (q.trim().length === 0) {
      toast.error('Please enter a valid query');
      return;
    }
    searchStory(q);
    setQ('');
  }
  /**
   * Обработчик изменения значения ввода.
   * @function
   * @name handleChange
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения ввода.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setQ(value);
  }

  return (
    <div>
      <form className='p-3 border-2 bg-white rounded' onSubmit={handleSubmit}>
        <label className='grid gap-2'>
          <span className='font-medium'>Enter search query</span>
          <input type='text' className='input' value={q} onChange={handleChange} />
        </label>
      </form>
    </div>
  );
};

export default Form;