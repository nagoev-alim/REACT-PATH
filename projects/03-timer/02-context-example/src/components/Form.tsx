import { useAppContext } from '../context/AppContext.tsx';


/**
 * Компонент формы для ввода времени таймера.
 * @component
 */
const Form = () => {
  /**
   * Получение функции обработки отправки формы из контекста приложения.
   */
  const { handleSubmit } = useAppContext();
  return (
    <form className='grid gap-3' onSubmit={handleSubmit}>
      <input className='input' type='number' name='time' min={1} max={60} step={1}
             placeholder='Enter number of minutes (maximum - 60):' />
      <button className='btn' type='submit'>Start</button>
    </form>
  );
};

export default Form;
