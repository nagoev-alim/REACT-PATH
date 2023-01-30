import { AppWrapper, GithubProfile } from './components/index.js';
import { AppProvider } from './context/AppContext';

const App = () => (
  <AppProvider>
    <AppWrapper>
      <GithubProfile />
    </AppWrapper>
  </AppProvider>
);

export default App;
