import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { capitalStr } from '../utils/capitalStr.ts';

const Header = () => {
  const [theme, setTheme] = useState<string>(() => {
    const theme = localStorage.getItem('theme');
    return theme ?? 'light';
  });

  useEffect(function() {
    localStorage.setItem('theme', theme);
    document.querySelector(':root')!.className = theme;
  }, [theme]);

  function handleThemeToggle(): void {
    setTheme(v => v === 'light' ? 'dark' : 'light');
  }

  return (
    <header className='bg-white border-b-2 p-3 dark:bg-slate-600 dark:border-b-slate-600 transition-colors'>
      <nav className='max-w-4xl w-full mx-auto flex flex-wrap justify-between items-center'>
        <Link className='font-medium text-sm sm:text-lg' to='/'>Where in the world?</Link>
        <button
          className='text-sm flex gap-1.5 items-center sm:text-base'
          onClick={handleThemeToggle}>
          {theme === 'light' ? <FiSun size={20} /> : <FiMoon size={20} />}
          {capitalStr(theme)} Mode
        </button>
      </nav>
    </header>
  );
};

export default Header;
