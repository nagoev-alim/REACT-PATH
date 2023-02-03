import { useAppHook } from '../../context/AppContext.jsx';
import { TOGGLE_THEME } from '../../context/constant.js';
import { FiMoon, FiSun } from 'react-icons/all';


const Header = () => {
  const { dispatch, theme } = useAppHook();
  return <header className='header'>
    <h1 className='h4'>
      Feedback
      <button onClick={() => dispatch({
        type: TOGGLE_THEME, payload: theme === 'light' ? 'dark' : 'light',
      })}>
        {theme === 'light' ? <FiMoon size={25} /> : <FiSun size={25} />}
      </button>
    </h1>
  </header>;
};

export default Header;
