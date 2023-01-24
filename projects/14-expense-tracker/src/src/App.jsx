import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { ExpenseTracker } from './components/index.js';
import { useEffect, useState } from 'react';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [transactions, setTransactions] = useState(localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : []);
  const [expenseData, setExpenseData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    updateBalance(transactions)
  }, []);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function updateBalance - Calculate balance
   */
  const updateBalance = (data) => {
    const amounts = data.map(({ amount }) => amount);
    const balance = amounts
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2);
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2);
    const expense = (amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc + item), 0) * -1)
      .toFixed(2);
    setExpenseData({ balance, income, expense });
  };

  /**
   * @function onDelete - Delete transaction
   * @param itemId
   */
  const onDelete = (itemId) => {
    if (confirm('Do you want to delete the entry?')) {
      setTransactions(prev => {
        const transactions = prev.filter(({ id }) => id !== itemId);
        updateBalance(transactions);
        localStorage.setItem('transactions', JSON.stringify(transactions))
        return transactions;
      });
    }
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <ExpenseTracker
        transactions={transactions}
        setTransactions={setTransactions}
        expenseData={expenseData}
        updateBalance={updateBalance}
        onDelete={onDelete}
      />
    </div>
    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
