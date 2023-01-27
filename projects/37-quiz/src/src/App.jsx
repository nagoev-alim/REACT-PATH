import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FiGithub, FiImage } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { FinishPage, QuestionsPage, SetupPage } from './components/index.js';

/**
 * @function App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================


  // =====================
  // 🚀 Methods
  // ====================

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='quiz'>
        <Router>
          <Routes>
            <Route path='/' exact element={<SetupPage/>} />
            <Route path='/questions' exact element={<QuestionsPage />} />
            <Route path='/score' exact element={<FinishPage />} />
          </Routes>
        </Router>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
