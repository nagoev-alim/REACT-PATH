import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiX } from 'react-icons/fi';
import { formatter } from './utils/formatter.ts';

/**
 * @interface Transaction - Структура данных транзакции.
 * @property {string} id - Уникальный идентификатор транзакции.
 * @property {string} text - Описание транзакции.
 * @property {number} amount - Сумма транзакции.
 */
interface Transaction {
  id: string;
  text: string;
  amount: number;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние транзакций.
   * @type {Transaction[]}
   */
  const [transactions, setTransactions] = useState<Transaction[] | []>(() => {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  });
  /**
   * Состояние баланса.
   * @type {number}
   */
  const [balance, setBalance] = useState<number>(0);

  /**
   * Состояние дохода.
   * @type {number}
   */
  const [income, setIncome] = useState<number>(0);

  /**
   * Состояние расхода.
   * @type {number}
   */
  const [expense, setExpense] = useState<number>(0);

  useEffect(function() {
    updateBalance(transactions);
  }, []);


  /**
   * Обработчик отправки формы для добавления новой транзакции.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get('text') as string;
    const amount = formData.get('amount') as string;
    if (text.trim().length === 0 || amount.trim().length === 0) {
      toast.error('Please add a text and amount.');
      return;
    }
    const data = [...transactions, { id: uuidv4(), text, amount: Number(amount) }];
    localStorage.setItem('transactions', JSON.stringify(data));
    updateBalance(data);
    setTransactions(data);
    form.reset();
  }

  /**
   * Обновляет состояние баланса, дохода и расхода на основе данных транзакций.
   * @function
   * @param {Transaction[]} data - Массив транзакций.
   * @returns {void}
   */
  function updateBalance(data: Transaction[]): void {
    const amounts = data.map(({ amount }) => amount);
    setBalance(+amounts
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2));
    setIncome(+amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2));
    // @ts-ignore
    setExpense((amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc + item), 0) * -1)
      .toFixed(2));
  }

  /**
   * Обработчик удаления транзакции.
   * @function
   * @param {string} itemId - Идентификатор транзакции.
   * @returns {void}
   */
  function handleDelete(itemId: string) {
    if (confirm('Do you want to delete the entry?')) {
      let data = [...transactions];
      data = data.filter(({ id }) => id !== itemId);
      localStorage.setItem('transactions', JSON.stringify(data));
      updateBalance(data);
      setTransactions(data);
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Expense Tracker</h1>
      <div className='grid gap-3'>
        <header className='grid place-items-center gap-2 p-2 rounded bg-slate-50 font-bold border'>
          <h2 className='text-2xl'>Your Balance</h2>
          <p className='text-3xl'>{formatter.format(balance)}</p>
        </header>
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
        {transactions.length !== 0 && (
          <div className='grid gap-2'>
            <h5 className='p-2 rounded bg-slate-50 font-bold border'>History</h5>
            <ul className='grid gap-2 max-h-[200px] overflow-auto'>
              {transactions.map(({ text, amount, id }, idx) =>
                <li
                  className={`border-2 flex p-2 gap-2 rounded ${amount < 0 ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}
                  key={idx}>
                  <p>{text}</p>
                  <span
                    className={`ml-auto font-bold text-${amount < 0 ? 'red' : 'green'}-400`}>
                    {amount < 0 ? '-' : '+'}{Math.abs(amount)}
                  </span>
                  <button onClick={() => handleDelete(id)}>
                    <FiX size={20} />
                  </button>
                </li>,
              )}
            </ul>
          </div>
        )}
        <h5 className='p-2 rounded bg-slate-50 font-bold border'>Add new transaction</h5>
        <form className='grid gap-3' onSubmit={handleSubmit}>
          <label className='grid gap-1'>
            <span className='text-sm font-medium'>Text</span>
            <input className='input' type='text' name='text' placeholder='Enter text' />
          </label>
          <label className='grid gap-1'>
            <span className='text-sm font-medium'>Amount (negative - expense, positive - income)</span>
            <input className='input' type='number' name='amount' placeholder='Enter amount' />
          </label>
          <button className='btn'>Add transaction</button>
        </form>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
