import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailPage, MainPage } from './index.js';

const MealFinder = () => {
  // 🚀 METHODS: ================================
  // 🚀 RENDER: ================================
  return <div className='meal'>
    <h1 className='title'>Meal Finder</h1>
    <div className='main'>
      <Router>
        <Routes>
          <Route path='/' exact element={<MainPage />} />
          <Route path='/detail/:mealId' exact element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  </div>;
};

export default MealFinder;
