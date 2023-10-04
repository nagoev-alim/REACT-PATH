import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Users } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://api.github.com/users?since=1&per_page=100');
        setUsers(data);
        setLoading(false);
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className='p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Custom Pagination</h1>
      <Users
        users={users.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
        loading={loading}
      />
      <Pagination
        currentPage={currentPage}
        total={100}
        limit={10}
        onPageChange={(page) => setCurrentPage(page)}
        loading={loading}
      />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
