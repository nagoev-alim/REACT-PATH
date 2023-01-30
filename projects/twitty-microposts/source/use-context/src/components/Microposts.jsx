import { Form, Posts } from './index.js';

const Microposts = () => (
  <div className='microposts'>
    <header className='microposts__header'>
      <h1 className='h3'>Twitty</h1>
    </header>
    <div className='microposts__main'>
      <Form />
      <Posts />
    </div>
  </div>
);

export default Microposts;
