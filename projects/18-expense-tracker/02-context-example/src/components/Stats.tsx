import { formatter } from '../utils/formatter.ts';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения статистики доходов и расходов.
 * @component
 */
const Stats = () => {
  const { income, expense } = useAppContext();
  return (
    <div>
      <ul className='grid grid-cols-2'>
        {['plus', 'minus'].map((i, idx) =>
          <li key={idx}>
            <p className='border p-3 flex justify-center items-center font-bold'>
              {i === 'plus' ? 'Income' : 'Expense'}
            </p>
            <p
              className={`border p-3 flex text-lg justify-center items-center font-bold ${i === 'plus' ? 'text-green-500' : 'text-red-500'}`}>
              {formatter.format(i === 'plus' ? income : expense)}
            </p>
          </li>,
        )}
      </ul>
    </div>
  );
};

export default Stats;
