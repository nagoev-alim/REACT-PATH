import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { PasswordGenerator } from './components/index.js';
import { useState } from 'react';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [pwd, setPwd] = useState(null);

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <div className='pwd-generator'>
        <h1 className='title'>Password Generator</h1>
        <PasswordGenerator
          pwd={pwd}
          setPwd={setPwd}
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
