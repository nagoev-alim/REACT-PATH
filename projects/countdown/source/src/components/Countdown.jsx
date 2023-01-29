import { Form, Timer } from './index.js';
import { useAppHook } from '../context/AppContext.jsx';

const Countdown = () => {
  const { title } = useAppHook();

  // 🚀 RENDER: ================================
  return <div className='countdown'>
    <h1 className='title countdown__title'>{title ?? 'Countdown'}</h1>
    <Form />
    <Timer />
  </div>;
};

export default Countdown;
