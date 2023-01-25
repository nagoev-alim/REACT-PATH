import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { DotWave } from '@uiball/loaders';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [isLoading, setIsLoading] = useState(false);
  const [fact, setFact] = useState(null);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function onSubmit - Form submit handler
   * @param event
   * @return {Promise<void>}
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const number = Number(Object.fromEntries(new FormData(form).entries()).number);

    if (number === 0) {
      toast.error('Please enter a number.');
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://numbersapi.com/${number}`);
      setFact(data);
      setIsLoading(false);
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }

    form.reset();
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='number-facts'>
        <h1 className='title'>Number Facts</h1>
        <form onSubmit={onSubmit}>
          <input type='number' name='number' placeholder='Enter a number' />
        </form>
        {fact && <p className='fact'>{fact}</p>}
        {isLoading && <div className='loader'><DotWave size={47} speed={1} color='black' /></div>}
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
