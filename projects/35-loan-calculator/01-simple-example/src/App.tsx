import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { LineWobble } from '@uiball/loaders';
import { formatter } from './utils/formatter.ts';

/**
 * Интерфейс для представления данных о кредите.
 * @interface
 * @name Data
 */
interface Data {
  monthly: string;
  principal: string;
  interest: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Loan Calculator".
 */
const App = () => {
  /**
   * Состояние для хранения данных о кредите.
   * @type {Data | null}
   */
  const [data, setData] = useState<Data | null>(null);

  /**
   * Состояние для отслеживания процесса загрузки.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Обработчик отправки формы для расчета кредита.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {void}
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const amountInput = parseInt(formData.get('amount') as string, 10);
    const interestInput = parseInt(formData.get('interest') as string, 10);
    const repayInput = parseInt(formData.get('repay') as string, 10);
    if (amountInput === 0 || interestInput === 0 || repayInput === 0) {
      toast.error('Please enter a number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const principle = amountInput;
      const interest = interestInput / 100 / 12;
      const payments = repayInput * 12;
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
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Loan Calculator</h1>
      <form className='grid gap-3' onSubmit={handleSubmit}>
        <input className='input' type='number' name='amount' placeholder='Loan amount' />
        <input className='input' type='number' name='interest' placeholder='Interest' />
        <input className='input' type='number' name='repay' placeholder='Years to repay' />
        <button className='btn' type='submit'>Calculate</button>
      </form>

      {isLoading && (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )}

      {!isLoading && data && (
        <ul className=''>
          <li className='grid gap-2 place-items-center items-center'>
            <p className='font-bold'>Monthly Payments:</p>
            <p className=' text-2xl'>{formatter.format(data.monthly)}</p>
          </li>
          <li className='grid gap-2 place-items-center items-center'>
            <p className='font-bold'> Total Principal Paid:</p>
            <p className=' text-2xl'>{formatter.format(data.principal)}</p>
          </li>
          <li className='grid gap-2 place-items-center items-center'>
            <p className='font-bold'>Total Interest Paid:</p>
            <p className='text-2xl'>{formatter.format(data.interest)}</p>
          </li>
        </ul>
      )}

      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
