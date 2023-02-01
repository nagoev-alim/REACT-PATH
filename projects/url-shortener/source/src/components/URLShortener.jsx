import { Ping } from '@uiball/loaders';
import { FiClipboard, FiTrash2 } from 'react-icons/all.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const URLShortener = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // 🚀 METHODS: ================================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const url = Object.fromEntries(new FormData(form).entries()).url.trim();
    if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(url) || url.length === 0) {
      toast.error('Please select validate URL.');
      return;
    }
    setIsLoading(false);
    try {
      const {
        data: {
          ok,
          result: { full_short_link },
        },
      } = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`);
      if (!ok) {
        toast.error('Something went wrong, open dev console.');
        return;
      }
      setData(prev => [...prev, {
        url: full_short_link,
        id: uuidv4(),
      }]);
      setIsLoading(true);
    } catch (e) {
      setIsLoading(false);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  };

  const onCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied successfully to clipboard.');
  };

  const onDelete = (id) => {
    if (confirm('Are you sure?')) {
      let copy = [...data];
      copy = copy.filter(item => item.id !== id);
      setData(copy);
      toast.success('URL successfully deleted.');
    }
  };

  // 🚀 RENDER: ================================
  return <div className='shortener'>
    <h1 className='title shortener__title'>URL Shortener</h1>
    <form className='shortener__form' onSubmit={onSubmit}>
      <input type='text' name='url' placeholder='Paste a link to shorten it' />
      <button className='button button--fluid button--primary' type='submit'>Submit</button>
    </form>

    {!isLoading && <div className='loading'><Ping size={45} speed={2} color='black' /></div>}

    {data.length !== 0 &&
      <ul className='shortener__list'>
        {data.map(({ id, url }) =>
          <li className='shortener__item' key={id}>
            <input type='text' value={url} disabled readOnly />
            <button className='button button--fluid button--green' onClick={() => onCopy(url)}>
              <FiClipboard size={25} />
            </button>
            <button className='button button--fluid button--red' onClick={() => onDelete(id)}>
              <FiTrash2 size={25} />
            </button>
          </li>,
        )}
      </ul>
    }
  </div>;
};

export default URLShortener;
