import { AppWrapper, PhoneCart } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
    <AppProvider>
      <AppWrapper>
        <PhoneCart />
      </AppWrapper>
    </AppProvider>
);

export default App;
