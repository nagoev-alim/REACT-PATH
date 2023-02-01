import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailPage, HomePage } from './index.js';

const Pokedex = () => (
  <div className='pokedex'>
    <h1 className='title pokedex__title'>Pokedex</h1>
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/detail/:id' exact element={<DetailPage />} />
      </Routes>
    </Router>
  </div>
);

export default Pokedex;
