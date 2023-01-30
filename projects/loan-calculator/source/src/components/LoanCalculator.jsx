import { LineWobble } from '@uiball/loaders';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { formatter } from '../utils/formatter.js';

const LoanCalculator = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 METHODS: ================================
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { amount, interest, repay } = Object.fromEntries(new FormData(form).entries());

    const inputs = {
      amount: Number(amount),
      interest: Number(interest),
      repay: Number(repay),
    };

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

  // 🚀 RENDER: ================================
  return <div className='loan-calculator'>
    <h1 className='title loan-calculator__title'>Loan Calculator</h1>

    <form onSubmit={onSubmit}>
      <input type='number' name='amount' placeholder='Loan amount' />
      <input type='number' name='interest' placeholder='Interest' />
      <input type='number' name='repay' placeholder='Years to repay' />
      <button className='button button--green button--fluid' type='submit'>Calculate</button>
    </form>

    {isLoading && <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>}

    <ul className={`${data && 'show'}`}>
      <li>
        <p className='h6'>Monthly Payments:</p>
        <p className='h4'>{data && formatter.format(data.monthly)}</p>
      </li>
      <li>
        <p className='h6'> Total Principal Paid:</p>
        <p className='h4'>{data && formatter.format(data.principal)}</p>
      </li>
      <li>
        <p className='h6'>Total Interest Paid:</p>
        <p className='h4'>{data && formatter.format(data.interest)}</p>
      </li>
    </ul>
  </div>;
};

export default LoanCalculator;
