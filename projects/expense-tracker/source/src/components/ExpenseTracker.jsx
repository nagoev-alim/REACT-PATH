import { useEffect, useState } from 'react';
import { formatter } from '../utils/formatter.js';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(
    localStorage.getItem('transactions')
      ? JSON.parse(localStorage.getItem('transactions'))
      : [],
  );
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    updateBalance(transactions);
  }, []);

  // 🚀 METHODS: ================================

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { text, amount } = Object.fromEntries(new FormData(form).entries());
    if (text.trim().length === 0 || amount.trim().length === 0) {
      toast.error('Please add a text and amount.');
      return;
    }
    const data = [...transactions, { id: uuidv4(), text, amount: Number(amount) }];
    localStorage.setItem('transactions', JSON.stringify(data));
    updateBalance(data);
    setTransactions(data);
    form.reset();
  };

  const updateBalance = (data) => {
    const amounts = data.map(({ amount }) => amount);
    setBalance(amounts
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2));
    setIncome(amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2));
    setExpense((amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc + item), 0) * -1)
      .toFixed(2));
  };

  const onDelete = (itemId) => {
    if (confirm('Do you want to delete the entry?')) {
      let data = [...transactions];
      data = data.filter(({ id }) => id !== itemId);
      localStorage.setItem('transactions', JSON.stringify(data));
      updateBalance(data);
      setTransactions(data);
    }
  };

  // 🚀 RENDER: ================================
  return <div className='tracker'>
    <h1 className='title tracker__title'>Expense Tracker</h1>
    <div className='container'>
      <header>
        <h2 className='h5'>Your Balance</h2>
        <p className='h3'>{formatter.format(balance)}</p>
      </header>

      <ul className='stats'>
        {['plus', 'minus'].map((i, idx) =>
          <li key={idx}>
            <p>{i === 'plus' ? 'Income' : 'Expense'}</p>
            <p data-value={i}
               className={`stats__item stats__item--${i}`}>{formatter.format(i === 'plus' ? income : expense)}</p>
          </li>,
        )}
      </ul>

      {transactions.length !== 0 && <>
        <h5 className='h6'>History</h5>
        <ul className='history'>
          {transactions.map(({ text, amount, id }, idx) =>
            <li className={`${amount < 0 ? 'minus' : 'plus'}`} key={idx}>
              <p>{text}</p>
              <span>{amount < 0 ? '-' : '+'}{Math.abs(amount)}</span>
              <button onClick={() => onDelete(id)}><FiX size={20} /></button>
            </li>,
          )}
        </ul>
      </>}

      <h5 className='h6'>Add new transaction</h5>
      <form onSubmit={onSubmit}>
        <label>
          <span>Text</span>
          <input type='text' name='text' placeholder='Enter text' />
        </label>
        <label>
          <span>Amount (negative - expense, positive - income)</span>
          <input type='number' name='amount' placeholder='Enter amount' />
        </label>
        <button className='button button--fluid button--primary'>Add transaction</button>
      </form>
    </div>

  </div>;
};

export default ExpenseTracker;
