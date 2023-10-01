import { Form, Timer, Title } from './components';
import { Toaster } from 'react-hot-toast';

/**
 * Компонент приложения Countdown.
 * Этот компонент представляет собой главный компонент приложения Countdown, который объединяет и
 * отображает другие компоненты для создания и настройки таймера обратного отсчета.
 * @component
 */
const App = () => {
  return (
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3'>
      {/* Заголовок отсчета времени */}
      <Title />
      {/* Форма для настройки отсчета времени */}
      <Form />
      {/* Компонент таймера */}
      <Timer />
      {/* Компонент для вывода уведомлений */}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
