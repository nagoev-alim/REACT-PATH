import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { Pagination, Users } from './components/index.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://api.github.com/users?since=1&per_page=40');
        setUsers(data);
        setLoading(false);
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <div className='custom-pagination'>
        <h1 className='title'>Custom Pagination</h1>
        <Users users={users.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
               loading={loading} />
        {!loading && <Pagination
          currentPage={currentPage}
          perPageCount={perPageCount}
          totalUsers={users.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />}
      </div>
    </div>
    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
