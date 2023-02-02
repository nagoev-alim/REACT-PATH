import { AppWrapper, BookHub } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
    <AppProvider>
      <AppWrapper>
        <BookHub />
      </AppWrapper>
    </AppProvider>
);

export default App;
