import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FilterableList } from './components/index.js';
import axios from 'axios';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('usersList')) || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (users.length !== 0) return;

      try {
        setIsLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        localStorage.setItem('usersList', JSON.stringify(data));
        setUsers(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <div className='filterable-list'>
        <h1 className='title'>Filterable List</h1>
        <FilterableList
          users={users}
          isLoading={isLoading}
        />
      </div>
    </div>
    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
