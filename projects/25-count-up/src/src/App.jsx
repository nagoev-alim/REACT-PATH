import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  // =====================
  // 🚀 Methods
  // =====================
  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='countup'>
        <h1 className='title'>Our stats</h1>
        <div className='countup__list'>
          <CountUp count={100} text='Succeeded projects' time={80} />
          <CountUp count={140} text='Working hours spent' time={90} />
          <CountUp count={200} text='Happy clients' time={110} />
        </div>
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

/**
 * @function CountUp
 * @param count
 * @param text
 * @param time
 * @return {JSX.Element}
 * @constructor
 */
const CountUp = ({ count, text, time = 1000 }) => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(counter => {
        const current = counter < Number(count) ? counter + 1 : count;
        if (current === count) clearInterval(intervalId);
        return current;
      });

    }, time);

    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  // =====================
  // 🚀 Render
  // =====================
  return <div>
    <p>{counter}+</p>
    <h3>{text}</h3>
  </div>;
};

export default App;
