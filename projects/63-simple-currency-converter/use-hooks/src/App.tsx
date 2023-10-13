import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mock from './mock';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Simple Currency Converter".
 */
const App = () => {
  // Состояния для исходной валюты, целевой валюты, суммы для конвертации,
  // состояний загрузки, ошибки и сконвертированной суммы.
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [converted, setConverted] = useState<string>('');
  /**
   * Эффект, который вызывается при изменении исходной валюты, целевой валюты или суммы для конвертации.
   * Выполняет запрос данных о курсе обмена и обновляет состояния приложения.
   */
  useEffect(() => {
    if (fromCurrency === toCurrency) return setConverted(amount);
    fetchData();
  }, [fromCurrency, toCurrency, amount]);

  /**
   * Функция для выполнения запроса к API с данными о курсе обмена.
   * Обрабатывает успешный ответ и обновляет состояния.
   */
  async function fetchData(): Promise<void> {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      setConverted(data.rates[toCurrency]);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setError(e.message);
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Currency Converter</h1>
      <input className='input' type='number' value={amount} onChange={({ target: { value } }) => setAmount(+value)}
             disabled={loading} />
      <select className='input' value={fromCurrency} onChange={({ target: { value } }) => setFromCurrency(value)}
              disabled={loading}>
        {mock.map((currency) => <option key={currency.label} value={currency.label}>{currency.label}</option>)}
      </select>
      <select className='input' value={toCurrency} onChange={({ target: { value } }) => setToCurrency(value)}
              disabled={loading}>
        {mock.map((currency) => <option key={currency.label} value={currency.label}>{currency.label}</option>)}
      </select>
      {error && <p className='text-center text-red-500'>{error}</p>}
      {loading && <p className='text-center'>Loading...</p>}
      <p className='text-center font-bold'>{!loading && !error && `${converted} ${toCurrency}`}</p>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
