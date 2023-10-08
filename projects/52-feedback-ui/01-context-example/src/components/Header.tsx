import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';
import { FiMoon, FiSun } from 'react-icons/fi';

/**
 * Компонент для отображения заголовка страницы.
 * @function
 * @name Header
 * @returns {JSX.Element} React-элемент компонента заголовка.
 */
const Header = () => {
  const { dispatch, theme } = useAppContext();

  /**
   * Обработчик смены темы (светлая/темная).
   * @function
   * @name handleTheme
   */
  function handleTheme(): void {
    dispatch({
      type: TYPES.TOGGLE_THEME,
      payload: theme === 'light' ? 'dark' : 'light',
    });
  }

  return (
    <header className='bg-white border-b-2 p-3 dark:bg-neutral-700'>
      <h1 className='text-lg text-center font-bold flex justify-center gap-1.5'>
        Feedback
        <button onClick={handleTheme}>
          {theme === 'light' ? <FiMoon size={25} /> : <FiSun size={25} />}
        </button>
      </h1>
    </header>
  );
};

export default Header;
