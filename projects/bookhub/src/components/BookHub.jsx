import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutPage, DetailPage, FavoritesPage, Header, HomePage } from './index.js';

const BookHub = () => (
  <Router>
    <div className='bookhub'>
      <Header />
      <main className='bookhub__main'>
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/detail/:id' exact element={<DetailPage />} />
            <Route path='/about' exact element={<AboutPage />} />
            <Route path='/favorites' exact element={<FavoritesPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);
export default BookHub;
