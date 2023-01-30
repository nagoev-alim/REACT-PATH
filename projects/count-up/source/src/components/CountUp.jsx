import { useEffect, useState } from 'react';

const CountUp = () => (
  <div className='countup'>
    <h1 className='title countup__title'>Count Up</h1>
    <div className='countup__list'>
      <Item count={100} text='Succeeded projects' time={80} />
      <Item count={140} text='Working hours spent' time={90} />
      <Item count={170} text='Happy clients' time={110} />
    </div>
  </div>
);


const Item = ({ count, text, time = 1000 }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(counter => {
        const current = counter < Number(count) ? counter + 1 : count;
        if (current === count) clearInterval(intervalId);
        return current;
      });
    }, time);

    return () => clearInterval(intervalId);
  }, [counter]);

  // 🚀 RENDER: ================================
  return <div className='countup__item'>
    <p className='h2'>{counter}+</p>
    <p>{text}</p>
  </div>;
};


export default CountUp;
