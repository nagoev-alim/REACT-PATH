import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { CurrencyConverter } from './components/index.js';

const App = () => {
  return <div className='npp'>
    <div className='npp-app'>
      <CurrencyConverter />
    </div>

    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
