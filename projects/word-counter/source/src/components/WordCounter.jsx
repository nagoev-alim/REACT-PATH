import { useState } from 'react';

const WordCounter = () => {
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
  });

  // 🚀 RENDER: ================================
  return <div className='word-counter'>
    <h1 className='title word-counter__title'>Word Counter</h1>
    <textarea className='word-counter__field' placeholder='Enter some text below' onChange={({ target: { value } }) => {
      setStats(() => ({
        words: value.length !== 0 ? value.trim().length : 0,
        characters: value.length !== 0 ? value.trim().match(/\S+/g).length : 0,
      }));
    }} />
    <p>You've written <span>{stats.words}</span> words and <span>{stats.characters}</span> characters.</p>
  </div>;
};

export default WordCounter;
