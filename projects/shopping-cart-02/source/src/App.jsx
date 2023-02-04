import { AppWrapper, Shop } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
    <AppProvider>
      <AppWrapper>
        <Shop />
      </AppWrapper>
    </AppProvider>
);

export default App;
