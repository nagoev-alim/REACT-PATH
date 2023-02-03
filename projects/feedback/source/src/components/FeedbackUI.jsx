import { Form, Header, List, Stats } from './index.js';


const FeedbackUI = () => (
  <div className='feedback-app'>
    <Header />
    <main className='main'>
      <div className='container'>
        <Form />
        <Stats />
        <List />
      </div>
    </main>
  </div>
);

export default FeedbackUI;
