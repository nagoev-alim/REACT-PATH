import { formatter } from '../utils/formatter.js';
import { FiX } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

/**
 * @function ExpenseTracker
 * @return {JSX.Element}
 * @constructor
 */
const ExpenseTracker = ({ transactions, setTransactions, expenseData, updateBalance, onDelete }) => {
  // =====================
  // 🚀 Methods
  // =====================
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, amount } = Object.fromEntries(new FormData(form).entries());

    if (text.trim().length === 0 || amount.trim().length === 0) {
      toast.error('Please add a text and amount.');
      return;
    }

    setTransactions(prev => {
      const transactions = [...prev, { id: uuidv4(), text, amount: Number(amount) }];
      updateBalance(transactions);
      localStorage.setItem('transactions', JSON.stringify(transactions))
      return transactions;
    });

    form.reset();
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='expense-tracker'>
    <h1 className='title'>Expense Tracker</h1>

    <div className='container'>
      <header>
        <h2>Your Balance</h2>
        <p>{formatter.format(expenseData.balance)}</p>
      </header>

      <ul className='stats'>
        {['plus', 'minus'].map((i, idx) =>
          <li key={idx}>
            <p>{i === 'plus' ? 'Income' : 'Expense'}</p>
            <p data-value={i} className={`stats__item stats__item--${i}`}>
              {formatter.format(i === 'plus' ? expenseData.income : expenseData.expense)}
            </p>
          </li>,
        )}
      </ul>

      {transactions.length !== 0 && (
        <>
          <h5>History</h5>
          <ul className='history'>
            {transactions.map(({ text, amount, id }, idx) =>
              <li className={`${amount < 0 ? 'minus' : 'plus'}`} key={idx}>
                <p>{text}</p>
                <span>{amount < 0 ? '-' : '+'}{Math.abs(amount)}</span>
                <button onClick={() => onDelete(id)}><FiX size={20} /></button>
              </li>,
            )}
          </ul>
        </>
      )}

      <h5>Add new transaction</h5>
      <form onSubmit={onSubmit}>
        <label>
          <span className='label'>Text</span>
          <input type='text' name='text' placeholder='Enter text' />
        </label>
        <label>
          <span className='label'>Amount (negative - expense, positive - income)</span>
          <input type='number' name='amount' placeholder='Enter amount' />
        </label>
        <button className='button'>Add transaction</button>
      </form>

    </div>
  </div>;
};


export default ExpenseTracker;
