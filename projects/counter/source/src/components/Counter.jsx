import { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const onDecrease = () => setCounter(prev => prev - 1);
  const onIncrease = () => setCounter(prev => prev + 1);
  const onReset = () => setCounter(0);
  const color = counter < 0 ? '#fc5859' : counter > 0 ? '#42a05b' : '#333';

  // 🚀 RENDER: ================================
  return <div className='counter'>
    <h1 className='title counter__title'>Counter</h1>
    <p className='counter__value' style={{ color }}>{counter}</p>
    <button className='button button--decrease' onClick={onDecrease}>Decrease</button>
    <button className='button button--reset' onClick={onReset}>Reset</button>
    <button className='button button--increase' onClick={onIncrease}>Increase</button>
  </div>;
};

export default Counter;
