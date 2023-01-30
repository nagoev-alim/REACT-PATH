import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinishPage, QuestionsPage, SetupPage } from './index.js';

const Quiz = () => (
  <div className='quiz'>
    <Router>
      <Routes>
        <Route path='/' exact element={<SetupPage/>} />
        <Route path='/questions' exact element={<QuestionsPage />} />
        <Route path='/score' exact element={<FinishPage />} />
      </Routes>
    </Router>
  </div>
)

export default Quiz;
