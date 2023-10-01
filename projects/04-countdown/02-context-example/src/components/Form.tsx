import React from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import { TIMER_ACTION } from '../utils/constants';

/**
 * Компонент формы для настройки отсчета времени.
 * Этот компонент предоставляет форму, которая позволяет пользователю настроить отсчет времени с указанием заголовка и даты.
 * @component
 */
const Form = () => {
  const { showForm, dispatch } = useAppContext();
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
    dispatch({ type: TIMER_ACTION.SET_COUNTDOWN, payload: { title, date } });
    dispatch({ type: TIMER_ACTION.TOGGLE_FORM });
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
