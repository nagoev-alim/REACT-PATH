import { AppWrapper, Categories, Form, List } from './components/index.js';
import { Provider } from './context/app-context';

const App = () => (
  <Provider>
    <AppWrapper>
      <Form/>
      <Categories/>
      <List/>
    </AppWrapper>
  </Provider>
);

export default App;
