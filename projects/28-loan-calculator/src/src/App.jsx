import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineWobble } from '@uiball/loaders';
import { formatter } from './utils/formatter.js';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function submitHandler - Form submit handler
   * @param event
   */
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { amount, interest, repay } = Object.fromEntries(new FormData(form).entries());

    const inputs = {
      amount: Number(amount),
      interest: Number(interest),
      repay: Number(repay),
    };

    console.log(inputs);
    if (inputs.amount === 0 || inputs.interest === 0 || inputs.repay === 0) {
      toast.error('Please enter a number.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const principle = inputs.amount;
      const interest = inputs.interest / 100 / 12;
      const payments = inputs.repay * 12;

      const x = Math.pow(1 + interest, payments);
      const monthly = (principle * x * interest) / (x - 1);

      if (isFinite(monthly)) {
        setData({
          monthly: monthly.toFixed(2),
          principal: (monthly * payments).toFixed(2),
          interest: (monthly * interest).toFixed(2),
        });
      }

      setIsLoading(false);
      form.reset();
    }, 1500);
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='loan-calculator'>
        <h1 className='title'>Loan Calculator</h1>

        <form onSubmit={onSubmit}>
          <label>
            <input type='number' name='amount' placeholder='Loan amount' />
          </label>
          <label>
            <input type='number' name='interest' placeholder='Interest' />
          </label>
          <label>
            <input type='number' name='repay' placeholder='Years to repay' />
          </label>
          <button className='button' type='submit'>Calculate</button>
        </form>

        {isLoading && <div className='loader'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>}

        <ul className={`${data && 'show'}`}>
          <li>
            <p>Monthly Payments:</p>
            <p>{data && formatter.format(data.monthly)}</p>
          </li>
          <li>
            <p>Total Principal Paid:</p>
            <p>{data && formatter.format(data.principal)}</p>
          </li>
          <li>
            <p>Total Interest Paid:</p>
            <p>{data && formatter.format(data.interest)}</p>
          </li>
        </ul>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
