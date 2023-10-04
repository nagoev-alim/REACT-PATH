import { FiX } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext.tsx';

/**
 * Компонент для отображения списка транзакций.
 * @component
 */
const Transactions = () => {
  const { transactions, handleDelete } = useAppContext();
  return transactions.length !== 0 ? (
    <div className='grid gap-2'>
      <h5 className='p-2 rounded bg-slate-50 font-bold border'>History</h5>
      <ul className='grid gap-2 max-h-[200px] overflow-auto'>
        {transactions.map((item, idx) => <Transaction key={idx} {...item} onClick={handleDelete} />)}
      </ul>
    </div>
  ) : null;
};

export default Transactions;

/**
 * Интерфейс свойств компонента Transaction.
 * @interface
 */
interface ITransactionProps {
  text: string,
  amount: number,
  id: string,
  onClick: (id: string) => void
}

/**
 * Компонент для отображения отдельной транзакции.
 * @component
 * @param {ITransactionProps} props - Свойства компонента.
 * @param {string} props.text - Текст транзакции.
 * @param {number} props.amount - Сумма транзакции.
 * @param {string} props.id - Идентификатор транзакции.
 * @param {Function} props.onClick - Обработчик удаления транзакции.
 */
const Transaction = ({ text, amount, id, onClick }: ITransactionProps) => {
  return (
    <li
      className={`border-2 flex p-2 gap-2 rounded ${amount < 0 ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
      <p>{text}</p>
      <span className={`ml-auto font-bold text-${amount < 0 ? 'red' : 'green'}-400`}>
        {amount < 0 ? '-' : '+'}{Math.abs(amount)}
      </span>
      <button onClick={() => onClick(id)}>
        <FiX size={20} />
      </button>
    </li>
  );
};
