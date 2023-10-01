import React from 'react';
import { toast } from 'react-hot-toast';
import { ITimer } from '../types';

/**
 * @interface
 * Свойства компонента Form.
 */
interface IFormProps {
  /**
   * Функция установки времени таймера.
   * @param {ITimer} value - Объект с данными таймера.
   */
  setTimer: (value: ITimer) => void;

  /**
   * Функция управления видимостью формы.
   * @param {boolean} value - Флаг видимости формы.
   */
  setShowForm: (value: boolean) => void;
}


/**
 * @component
 * Форма для ввода времени таймера.
 * @param {Object} props - Свойства компонента.
 * @param {function} props.setTimer - Функция установки времени таймера.
 * @param {function} props.setShowForm - Функция управления видимостью формы.
 */
const Form: React.FC<IFormProps> = ({ setTimer, setShowForm }) => {
  /**
   * Обработчик отправки формы с введенным временем.
   * @param {Event} event - Событие отправки формы.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const time = parseInt(formData.get('time') as string, 10);
    if (!time || time === 0) {
      toast.error('Please set a number.');
      return;
    }
    if (time < 60) {
      setTimer(() => {
        return ({
          timeLeft: time * 60,
          minutes: Math.floor(time * 60 / 60).toString().padStart(2, '0'),
          seconds: (time * 60 % 60).toString().padStart(2, '0'),
        });
      });
    }
    setShowForm(false);
    form.reset();
  }

  return (
    <form className='grid gap-3' onSubmit={handleSubmit}>
      <input className='input' type='number' name='time' min={1} max={60} step={1}
             placeholder='Enter number of minutes (maximum - 60):' />
      <button className='btn' type='submit'>Start</button>
    </form>
  );
};

export default Form;
