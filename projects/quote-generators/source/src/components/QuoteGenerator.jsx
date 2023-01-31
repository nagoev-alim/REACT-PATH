import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiClipboard } from 'react-icons/fi';
import axios from 'axios';
import { LineWobble } from '@uiball/loaders';
import mock from '../mock/mock.js';

const QuoteGenerator = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 METHODS: ================================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const source = Object.fromEntries(new FormData(form).entries()).source;
    if (!source) {
      toast.error('Please select source.');
      return;
    }
    await getQuote(source);
  };

  const getQuote = async (source) => {
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
  };

  const copyToClipboard = () => {
    if (!data && data.text) return;
    const textarea = document.createElement('textarea');
    textarea.value = data.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    toast.success('Success copied to clipboard.');
  };

  // 🚀 RENDER: ================================
  return <div className='quote-generator'>
    <h1 className='title quote-generator__title'>Quote Generators</h1>
    <form onSubmit={onSubmit}>
      <select name='source'>
        <option value=''>Select Source</option>
        {mock.map(({ name, value }) => <option key={name} value={value}>{name}</option>)}
      </select>
      <button type='submit' className='button button--primary button--fluid'>Submit</button>
    </form>

    {isLoading && <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>}

    {data && <div className='body'>
      <button onClick={copyToClipboard}><FiClipboard size={25} /></button>
      <p>"{data.text}"</p>
      {data.author && <p className='author'>{data.author}</p>}
    </div>}
  </div>;
};

export default QuoteGenerator;
