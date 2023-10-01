import { useAppContext } from '../context/AppContext';

/**
 * Компонент заголовка приложения Countdown.
 * Этот компонент отображает заголовок приложения, который может быть настроен через контекст приложения.
 * @component
 */
const Title = () => {
  const { title } = useAppContext();

  return (
    <h1 className='text-2xl md:text-4xl font-bold text-center'>{title ?? 'Countdown'}</h1>
  );
};

export default Title;
