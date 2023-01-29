import { AppWrapper, Countdown } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
  <AppProvider>
    <AppWrapper>
      <Countdown />
    </AppWrapper>
  </AppProvider>
);

export default App;
