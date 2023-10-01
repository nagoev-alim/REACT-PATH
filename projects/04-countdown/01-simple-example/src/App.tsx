import { useState } from 'react';
import { Form, Timer } from './components';
import { Toaster } from 'react-hot-toast';


/**
 * Компонент приложения Countdown.
 * @component
 */
const App = () => {
  /**
   * Состояние, определяющее, нужно ли показывать форму для настройки отсчета времени.
   * @type {boolean}
   */
  const [showForm, setShowForm] = useState<boolean>(!localStorage.getItem('countdown'));
  /**
   * Состояние заголовка отсчета времени.
   * @type {string | null}
   */
  const [title, setTitle] = useState<string | null>(() => {
    const countdown = localStorage.getItem('countdown');
    return countdown ? JSON.parse(countdown).title : null;
  });
  /**
   * Состояние даты окончания отсчета времени.
   * @type {string | null}
   */
  const [date, setDate] = useState<string | null>(() => {
    const countdown = localStorage.getItem('countdown');
    return countdown ? JSON.parse(countdown).date : null;
  });
  /**
   * Состояние, определяющее, завершен ли таймер.
   * @type {boolean}
   */
  const [endTimer, setEndTimer] = useState<boolean>(false);

  return (
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>{title ?? 'Countdown'}</h1>
      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        setTitle={setTitle}
        setDate={setDate}
      />
      <Timer
        showForm={showForm}
        setShowForm={setShowForm}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
        endTimer={endTimer}
        setEndTimer={setEndTimer}
      />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
