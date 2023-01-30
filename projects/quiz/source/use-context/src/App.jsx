import { AppWrapper, Quiz } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
  <AppProvider>
    <AppWrapper>
      <Quiz />
    </AppWrapper>
  </AppProvider>
);

export default App;
