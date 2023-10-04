import { formatter } from '../utils/formatter.ts';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения баланса.
 * @component
 */
const Header = () => {
  const { balance } = useAppContext();
  return (
    <header className='grid place-items-center gap-2 p-2 rounded bg-slate-50 font-bold border'>
      <h2 className='text-2xl'>Your Balance</h2>
      <p className='text-3xl'>{formatter.format(balance)}</p>
    </header>
  );
};

export default Header;
