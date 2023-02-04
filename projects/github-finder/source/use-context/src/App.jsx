import { AppWrapper, Header } from './components/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Home, NotFound, Single } from './pages/index.js';
import { AppProvider } from './context/AppContext.jsx';

const App = () => (
  <AppProvider>
    <AppWrapper>
      <div className='gh'>
        <Router>
          <Header />
          <div className='main'>
            <div className='main__container'>
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/single/:login' exact element={<Single />} />
                <Route path='/about' exact element={<About />} />
                <Route path='/*' exact element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </AppWrapper>
  </AppProvider>
);

export default App;
