import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';


const AppWrapper = ({ children }) => (
  <div className='npp'>
    <div className='npp-app'>
      {children}
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
    <Toaster position='bottom-center' />
  </div>
);

export default AppWrapper;
