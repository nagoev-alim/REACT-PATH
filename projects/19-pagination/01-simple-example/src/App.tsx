import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Users } from './components';

interface Users {
  avatar_url: string;
  login: string;
  html_url: string;
  id: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Pagination".
 */
const App = () => {
  const [users, setUsers] = useState<Users[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPageCount] = useState<number>(10);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Users[]>('https://api.github.com/users?since=1&per_page=40');
        setUsers(data);
        setLoading(false);
      } catch (e) {
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className='grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Custom Pagination</h1>
      <Users
        users={users.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
        loading={loading}
      />
      <Pagination
        loading={loading}
        currentPage={currentPage}
        perPageCount={perPageCount}
        totalUsers={users.length}
        paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
      />
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
