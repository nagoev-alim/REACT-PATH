import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import Countdown from './components/Countdown.jsx';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => (
  <>
    <div className='npp'>
      <div className='npp-app'>
        <Countdown />
        <Toaster position='bottom-center' />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>
);

export default App;
