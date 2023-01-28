import { FiClipboard } from 'react-icons/all';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { Ping } from '@uiball/loaders';

const Shortener = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState([]);

  // 🚀 METHODS: ================================
  /**
   * @function onSubmit - Form submit event handler
   * @param event
   * @returns {Promise<void>}
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const url = Object.fromEntries(new FormData(form).entries()).url.trim();

    if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(url) || url.length === 0) {
      toast.error('Please select validate URL.');
      return;
    }

    try {
      setIsLoading(false);

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

      setUrl(prev => [...prev, full_short_link]);
      setIsLoading(true);
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  };

  /**
   * @function onCopy - Copy text to clipboard
   */
  const onCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied successfully to clipboard.');
  };

  // 🚀 RENDER: ================================
  return <div className='shortener'>
    <h1 className='title'>URL Shortener</h1>
    <div className='main'>
      <form onSubmit={onSubmit}>
        <input type='text' name='url' placeholder='Paste a link to shorten it' />
        <button className='button' type='submit'>Submit</button>
      </form>

      {!isLoading && <div className='loading'><Ping size={45} speed={2} color='black' /></div>}

      {url.length !== 0 &&
        <ul className='url__list'>
          {url.map((text, idx) =>
            <li key={idx}>
              <input type='text' value={text} disabled readOnly />
              <button onClick={() => onCopy(text)}><FiClipboard size={25} /></button>
            </li>,
          )}
        </ul>
      }
    </div>
  </div>;
};

export default Shortener;
