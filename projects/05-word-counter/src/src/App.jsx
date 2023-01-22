import { FiGithub } from 'react-icons/fi';
import { useState } from 'react';

/**
 * @component App - Main Component
 * @return {JSX.Element}
 * @constructor
 */
const App = () => (
  <>
    <div className='npp'>
      <div className='npp-app'>
        <WordCounter />
      </div>
      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
    </div>
  </>
);

export default App;


/**
 * @function W
 * @return {JSX.Element}
 * @constructor
 */
const WordCounter = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
  });

  // =====================
  // 🚀 Methods
  // =====================
  const onChange = ({ target: { value } }) => {
    setStats(() => ({
      words: value.length !== 0 ? value.trim().length : 0,
      characters: value.length !== 0 ? value.trim().match(/\S+/g).length : 0,
    }));
  };

  // =====================
  // 🚀 Render
  // =====================
  return <>
    <h1 className='title'>Word Counter</h1>
    <label>
      <textarea placeholder='Enter some text below' onChange={onChange}></textarea>
    </label>
    <div>You've written <span>{stats.words}</span> words and <span>{stats.characters}</span> characters.</div>
  </>;
};
