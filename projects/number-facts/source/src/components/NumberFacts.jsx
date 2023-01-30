import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DotWave } from '@uiball/loaders';

const NumberFacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fact, setFact] = useState(null);

  // 🚀 METHODS: ================================
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
      setFact(null);
      const { data } = await axios.get(`http://numbersapi.com/${number}`);
      setFact(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }

    form.reset();
  };

  // 🚀 RENDER: ================================
  return <div className='number-facts'>
    <h1 className='title number-facts__title'>Number Facts</h1>
    <form onSubmit={onSubmit}>
      <input type='number' name='number' placeholder='Enter a number' />
    </form>
    {fact && <p className='fact'>{fact}</p>}
    {isLoading && <div className='loader'><DotWave size={47} speed={1} color='black' /></div>}
  </div>;
};


export default NumberFacts;
