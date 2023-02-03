import { AppWrapper, FeedbackUI } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
  <AppProvider>
    <AppWrapper>
      <FeedbackUI />
    </AppWrapper>
  </AppProvider>
);

export default App;
