import React from 'react';
import { toast } from 'react-hot-toast';

interface IFormProps {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  setTitle: (value: string | null) => void;
  setDate: (value: string | null) => void;
}


/**
 * Компонент формы для настройки отсчета времени.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.showForm - Флаг, указывающий, должна ли форма отображаться.
 * @param {function} props.setShowForm - Функция для установки состояния видимости формы.
 * @param {function} props.setTitle - Функция для установки заголовка отсчета времени.
 * @param {function} props.setDate - Функция для установки даты окончания отсчета времени.
 */
const Form:React.FC<IFormProps> = ({ showForm, setShowForm, setTitle, setDate }) => {
  const minDate = new Date().toISOString().split('T')[0];

  /**
   * Обработчик отправки формы для настройки отсчета времени.
   * @param {React.FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    if (title.trim().length === 0 || date.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    setTitle(title);
    setDate(date);
    setShowForm(false);
    localStorage.setItem('countdown', JSON.stringify({ title, date }));
    form.reset();
  }

  return (
    showForm && (
      <form className='grid gap-3' onSubmit={handleSubmit}>
        <label className='grid gap-1'>
          <span className='font-medium text-sm'>Name</span>
          <input className='input' type='text' name='title' placeholder='What are you counting down to?' />
        </label>
        <label className='grid gap-1'>
          <span className='font-medium text-sm'>Date</span>
          <input className='input' type='date' name='date' min={minDate} />
        </label>
        <button className='btn' type='submit'>Submit</button>
      </form>
    )
  );
};

export default Form;
