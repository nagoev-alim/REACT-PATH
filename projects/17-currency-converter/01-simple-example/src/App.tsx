import toast, { Toaster } from 'react-hot-toast';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import mock from './mock';
import { LineWobble } from '@uiball/loaders';
import { FiRepeat } from 'react-icons/fi';

/**
 * Интерфейс для данных валютного обмена.
 * @interface
 */
interface DataCurrency {
  info: {
    timestamp: number,
    quote: number
  };
  query: { from: string, to: string, amount: number };
  result: number;
  success: boolean;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Currency Converter".
 */
const App = () => {
  /**
   * Состояние для выбора исходной валюты.
   * @type {string}
   */
  const [fromSelect] = useState<string>('USD');

  /**
   * Состояние для выбора целевой валюты.
   * @type {string}
   */
  const [toSelect] = useState<string>('RUB');

  /**
   * Состояние для отслеживания загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Состояние для хранения данных о конвертации валют.
   * @type {DataCurrency | null}
   */
  const [data, setData] = useState<DataCurrency | null>(null);

  /**
   * Ссылка на поле ввода суммы для конвертации.
   * @type {React.RefObject}
   */
  const amountRef = useRef<HTMLInputElement | null>(null);

  /**
   * Ссылка на поле выбора исходной валюты.
   * @type {React.RefObject}
   */
  const fromRef = useRef<HTMLSelectElement | null>(null);

  /**
   * Ссылка на изображение флага исходной валюты.
   * @type {React.RefObject}
   */
  const fromImgRef = useRef<HTMLImageElement | null>(null);

  /**
   * Ссылка на поле выбора целевой валюты.
   * @type {React.RefObject}
   */
  const toRef = useRef<HTMLSelectElement | null>(null);

  /**
   * Ссылка на изображение флага целевой валюты.
   * @type {React.RefObject}
   */
  const toImgRef = useRef<HTMLImageElement | null>(null);

  /**
   * Обработчик отправки формы.
   * @async
   * @function
   * @param {FormEvent} event - Объект события формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const amount = formData.get('amount') as string;
    const to = formData.get('to') as string;
    const from = formData.get('from') as string;
    if (amount.trim().length === 0 || !to || !from) {
      toast.error('Please fill the fields.');
      return;
    }
    await fetchData(amount, from, to);
  }

  /**
   * Запрашивает данные о конвертации валют с API.
   * @async
   * @function
   * @param {string} amount - Сумма для конвертации.
   * @param {string} from - Исходная валюта.
   * @param {string} to - Целевая валюта.
   * @returns {Promise<void>}
   */
  async function fetchData(amount: string, from: string, to: string): Promise<void> {
    try {
      setIsLoading(true);
      const { data: { info, result, success, query } } = await axios.get<DataCurrency>(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, {
        method: 'GET',
        headers: {
          apikey: 'ZgJx4SELorf0Aid3wE9JzZLO424ZTamN',
        },
      });
      if (!success) {
        toast.error('Something went wrong, open dev console.');
        return;
      }
      setData({ info, result, success, query });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      toast.error('Something went wrong, open dev console.');
    }
  }

  /**
   * Обработчик изменения выбора валюты.
   * @function
   * @param {ChangeEvent<HTMLSelectElement>} event - Объект события выбора валюты.
   * @returns {void}
   */
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const target = event.target as HTMLSelectElement;
    const img = target.previousElementSibling!;
    try {
      img.src = `https://flagcdn.com/48x36/${mock.find(({ label }) => label === target.value).value.toLowerCase()}.png`;
      setTimeout(async () => {
        await fetchData(amountRef.current.value, fromRef.current.value, toRef.current.value);
      }, 1000);
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  }

  /**
   * Обработчик переключения валют.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  async function handleSwitch(): Promise<void> {
    const tmpCode = fromRef.current.value;
    const tmpSrc = fromImgRef.current.src;
    if (amountRef.current.value.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    fromRef.current.value = toRef.current.value;
    toRef.current.value = tmpCode;
    fromImgRef.current.src = toImgRef.current.src;
    toImgRef.current.src = tmpSrc;
    await fetchData(amountRef.current.value, fromRef.current.value, toRef.current.value);
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Currency Converter</h1>
      <form className='grid gap-2' onSubmit={handleSubmit}>
        <label className='grid gap-1'>
          <span className='text-sm font-medium'>Enter Amount</span>
          <input ref={amountRef} className='input' type='number' defaultValue='1' step='1' min='1' name='amount' />
        </label>
        <div className='grid grid-cols-[1fr_30px_1fr] items-center gap-1 md:gap-3 md:grid-cols-[1fr_40px_1fr]'>
          <Select imageRef={fromImgRef} flag='us' name='from' selectRef={fromRef} defaultValue={fromSelect}
                  onChange={handleChange} />
          <div className='mt-6 btn p-1 md:mt-7' onClick={handleSwitch}>
            <FiRepeat size={25} />
          </div>
          <Select imageRef={toImgRef} flag='ru' name='to' selectRef={toRef} defaultValue={toSelect}
                  onChange={handleChange} />
        </div>

        {isLoading && (
          <div className='flex justify-center py-3'>
            <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
          </div>
        )}

        {data && !isLoading && (
          <div className=''>
            <div className='grid grid-cols-2'>
              <span className='p-2 border font-bold'>Date</span>
              <span className='p-2 border'>{new Date().toLocaleString()}</span>
            </div>
            <div className='grid grid-cols-2'>
              <span className='p-2 border font-bold'>Rate</span>
              <p className='p-2 border'>
                <span>1</span> ${data.query.from} = <span>{data.result}</span> {data.query.to}</p>
            </div>
            <div className='grid grid-cols-2'>
              <span className='p-2 border font-bold'>Exchange</span>
              <p className='p-2 border'>
                <span>{data.query.amount}</span> ${data.query.from} = <span>{data.result}</span> {data.query.to}
              </p>
            </div>
          </div>
        )}
        <button className='btn' type='submit'>Get Exchange Rate</button>
      </form>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

/**
 * Пропсы для компонента Select.
 * @interface {object} ISelectProps
 * @property {HTMLImageElement | null} imageRef - Ссылка на изображение флага.
 * @property {HTMLSelectElement | null} selectRef - Ссылка на выпадающий список.
 * @property {string} name - Название компонента.
 * @property {string} flag - Название флага.
 * @property {string} defaultValue - Значение по умолчанию для выпадающего списка.
 * @property {(event: ChangeEvent<HTMLSelectElement>) => void} onChange - Обработчик изменения выбора в выпадающем списке.
 */
interface ISelectProps {
  imageRef: HTMLImageElement | null;
  selectRef: HTMLSelectElement | null;
  name: string;
  flag: string;
  defaultValue: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Компонент Select для выбора валюты.
 * @function
 * @param {ISelectProps} props - Пропсы компонента.
 * @returns {JSX.Element}
 */
const Select = ({ imageRef, name, flag, selectRef, defaultValue, onChange }: ISelectProps) => {
  return (
    <label className='grid gap-1'>
      <span className='text-sm font-medium'>To</span>
      <div className='relative'>
        <img ref={imageRef} className='absolute w-[20px] top-1/2 -translate-y-1/2 left-2'
             src={`https://flagcdn.com/48x36/${flag}.png`}
             alt={`flag ${flag}`} />
        <select ref={selectRef} className='input pl-8' name={name} onChange={onChange} defaultValue={defaultValue}>
          {mock.map(({ label, value }) => <option key={value} value={label}>{label}</option>)}
        </select>
      </div>
    </label>
  );
};
