import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FilterableList } from './components/index.js';
import axios from 'axios';


const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [data, setData] = useState(JSON.parse(localStorage.getItem('stateCapitals')) || []);
  const [isLoading, setIsLoading] = useState(false);

  console.log(data);
  useEffect(() => {
    (async () => {
      if (data.length !== 0) return;

      try {
        setIsLoading(true);
        const { data } = await axios.get('./mock/mock.json');
        localStorage.setItem('stateCapitals', JSON.stringify(data));
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <div className='filterable-list'>
        <h1 className='title'>State Capital Lookup</h1>
        <FilterableList
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
