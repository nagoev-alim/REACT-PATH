import toast, { Toaster } from 'react-hot-toast';
import { LineWobble } from '@uiball/loaders';
import { FiClipboard } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
import mock from './mock';
import axios from 'axios';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  /**
   * Состояние для хранения полученных данных о цитате или шутке.
   * @type {{ text?: string, author?: string } | null}
   */
  const [data, setData] = useState<{
    text?: string,
    author?: string
  } | null>(null);

  /**
   * Состояние для отслеживания процесса загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Функция для обработки отправки формы выбора источника цитаты.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const source = formData.get('source') as string;
    if (!source) {
      toast.error('Please select source.');
      return;
    }
    await handleGetQuote(source);
  }

  /**
   * Функция для загрузки цитаты или шутки из указанного источника.
   * @param {string} source - URL источника цитаты.
   * @returns {Promise<void>}
   */
  async function handleGetQuote(source: string): Promise<void> {
    try {
      setIsLoading(true);
      switch (source) {
        case 'https://api.chucknorris.io/jokes/random': {
          const { data: { value: text } } = await axios.get(source);
          setData({ text });
          break;
        }
        case 'https://api.quotable.io/random': {
          const { data: { author, content: text } } = await axios.get(source);
          setData({ text, author });
          break;
        }
        case 'https://type.fit/api/quotes': {
          const { data } = await axios.get(source);
          const { text, author } = data[Math.floor(Math.random() * data.length)];
          setData({ text, author });
          break;
        }
        case 'https://api.goprogram.ai/inspiration': {
          const { data: { quote: text, author } } = await axios.get(source);
          setData({ text, author });
          break;
        }
        case 'https://favqs.com/api/qotd': {
          const {
            data: {
              quote: {
                body: text,
                author,
              },
            },
          } = await axios.get(`https://cors-anywhere.herokuapp.com/${source}`);
          setData({ text, author });
          break;
        }
        case 'https://api.themotivate365.com/stoic-quote': {
          const { data: { quote: text, author } } = await axios.get(source);
          setData({ text, author });
          break;
        }
        case 'https://evilinsult.com/generate_insult.php?lang=en&type=json': {
          const { data: { insult: text } } = await axios.get(`https://cors-anywhere.herokuapp.com/${source}`);
          setData({ text });
          break;
        }
        case 'https://ron-swanson-quotes.herokuapp.com/v2/quotes': {
          const { data: text } = await axios.get(source);
          setData({ text });
          break;
        }
        case 'https://www.affirmations.dev/': {
          const { data: { affirmation: text } } = await axios.get(`https://cors-anywhere.herokuapp.com/${source}`);
          setData({ text });
          break;
        }
        case 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand': {
          const { data } = await axios.get(source);
          const {
            yoast_head_json: {
              og_title: author,
              og_description: text,
            },
          } = data[Math.floor(Math.random() * data.length)];
          setData({ text, author });
          break;
        }
        case 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json': {
          const {
            data: {
              quoteText: text,
              quoteAuthor: author,
            },
          } = await axios.get(`https://cors-anywhere.herokuapp.com/${source}`);
          setData({ text, author });
          break;
        }
        case 'https://api.api-ninjas.com/v1/quotes': {
          const { data } = await axios.get(source, {
            headers: { 'X-Api-Key': 'akxWnVBvUmGAjheE9llulw==TVZ6WIhfWDdCsx9o' },
          });
          const { quote: text, author } = data[0];
          setData({ text, author });
          break;
        }
        case 'https://official-joke-api.appspot.com/random_joke': {
          const { data: { punchline: author, setup: text } } = await axios.get(source);
          setData({ text, author });
          break;
        }
        case 'https://motivational-quotes1.p.rapidapi.com/motivation': {
          const { data: text } = await axios.request({
            method: 'POST',
            url: source,
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': 'a07622a786mshaea27da6a042696p1c7a02jsncc2e1c7e534e',
              'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
            },
            data: '{"key1":"value","key2":"value"}',
          });
          setData({ text });
          break;
        }
        default:
          break;
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setData(null);
      toast.error('Something went wrong, maybe you need to give access for CORS.');
    }
  }

  /**
   * Функция для копирования цитаты в буфер обмена.
   */
  function handleCopy(): void {
    if (!data || !data.text) return;
    navigator.clipboard.writeText(data.text);
    toast.success('Success copy to clipboard.');
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Quote Generators</h1>
      <form className='grid gap-3' onSubmit={handleSubmit}>
        <select className='input' name='source'>
          <option value=''>Select Source</option>
          {mock.map(({ name, value }) => <option key={name} value={value}>{name}</option>)}
        </select>
        <button type='submit' className='btn'>Submit</button>
      </form>

      {isLoading && (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )}

      {data && (
        <div className='grid gap-1.5'>
          <p>"{data.text}"</p>
          {data.author && <p className='font-bold'>{data.author}</p>}
          <button className='btn w-full' onClick={handleCopy}>
            <FiClipboard size={25} />
          </button>
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
