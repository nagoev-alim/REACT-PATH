import {FiGithub} from "react-icons/fi";
import {useState} from "react";

/**
 * @component App - Main App
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  return <>
    <div className='npp'>
      <div className="npp-app">
        <Counter/>
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25}/>
      </a>
    </div>
  </>
}

/**
 * @component Counter - Simple counter
 * @return {JSX.Element}
 * @constructor
 */
function Counter() {
  const [counter, setCounter] = useState(0)
  const onDecrease = () => setCounter(prev => prev - 1)
  const onReset = () => setCounter(0)
  const onIncrease = () => setCounter(prev => prev + 1)

  return <>
    <h1 className='title'>Counter</h1>
    <p className='value' style={{
      color: counter < 0 ? '#fc5859' : counter > 0 ? '#42a05b' : '#333'
    }}>{counter}</p>
    <div className='buttons'>
      <button className='button button--decrease' onClick={onDecrease}>
        Decrease
      </button>
      <button className='button button--reset' onClick={onReset}>
        Reset
      </button>
      <button className='button button--increase' onClick={onIncrease}>
        Increase
      </button>
    </div>
  </>
}
