import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { FiRepeat } from 'react-icons/all.js';
import options from '../mock/mock.js';
import { LineWobble } from '@uiball/loaders';

const CurrencyConverter = () => {
  const [fromSelect] = useState('USD');
  const [toSelect] = useState('RUB');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // 🚀 METHODS: ================================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { amount, to, from } = Object.fromEntries(new FormData(form).entries());
    if (amount.trim().length === 0 || !to || !from) {
      toast.error('Please fill the fields.');
      return;
    }
    await fetchData(amount, from, to);
  };

  const fetchData = async (amount, from, to) => {
    try {
      setIsLoading(true);
      const {
        data: {
          result,
          date,
          success,
          info: { rate },
        },
      } = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
      if (!success) {
        toast.error('Something went wrong, open dev console.');
        return;
      }
      setData(() => ({ amount, from, to, result, date, rate }));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const [data, setData] = useState(null);
      console.log(e);
      toast.error('Something went wrong, open dev console.');
    }
  };

  const onChange = ({ previousElementSibling, value }) => {
    try {
      previousElementSibling.src = `https://flagcdn.com/48x36/${options.find(({ label }) => label === value).value.toLowerCase()}.png`;
      setTimeout(async () => {
        await fetchData(
          document.querySelector('[type="number"]').value,
          document.querySelector('[name="from"]').value,
          document.querySelector('[name="to"]').value,
        );
      }, 1000);
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  };

  const onSwitch = async () => {
    const amount = document.querySelector('[type="number"]').value;
    const from = document.querySelector('[name="from"]');
    const to = document.querySelector('[name="to"]');
    const tmpCode = from.value;
    const tmpSrc = from.previousElementSibling.src;
    if (amount.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    from.value = to.value;
    to.value = tmpCode;
    from.previousElementSibling.src = to.previousElementSibling.src;
    to.previousElementSibling.src = tmpSrc;
    await fetchData(amount, from.value, to.value);
  };

  // 🚀 RENDER: ================================
  return <div className='currency-converter'>
    <h1 className='title currency-converter__title'>Currency Converter</h1>

    <form className='currency-converter__form' onSubmit={onSubmit}>
      <label>
        <span>Enter Amount</span>
        <input type='number' defaultValue='1' step='1' min='1' name='amount' />
      </label>

      <div className='currency-converter__directions'>
        <label>
          <span>From</span>
          <div className='select'>
            <img src='https://flagcdn.com/48x36/us.png' alt='flag' />
            <select name='from' onChange={({ target }) => onChange(target)} defaultValue={fromSelect}>
              {options.map(({ label, name }, idx) => <option key={idx} value={name}>{label}</option>)}
            </select>
          </div>
        </label>
        <div onClick={onSwitch}><FiRepeat size={25} /></div>
        <label>
          <span>To</span>
          <div className='select'>
            <img src='https://flagcdn.com/48x36/ru.png' alt='flag' />
            <select name='to' onChange={({ target }) => onChange(target)} defaultValue={toSelect}>
              {options.map(({ label, name }, idx) => <option key={idx} value={name}>{label}</option>)}
            </select>
          </div>
        </label>
      </div>

      {isLoading && <div className='loader'>
        <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
      </div>}
      {data && !isLoading && <div className='currency-converter__exchange'>
        <table>
          <tbody>
          <tr>
            <td><span>Date</span></td>
            <td>{new Date(data.date).toLocaleString()}</td>
          </tr>
          <tr>
            <td><span>Rate</span></td>
            <td><span>1</span> ${data.from} = <span>{data.rate}</span> {data.to}</td>
          </tr>
          <tr>
            <td><span>Exchange</span></td>
            <td><span>{data.amount}</span> ${data.from} = <span>{data.result}</span> {data.to}</td>
          </tr>
          </tbody>
        </table>
      </div>
      }

      <button className='button button--fluid button--primary' type='submit'>Get Exchange Rate</button>
    </form>

  </div>;
};

export default CurrencyConverter;
