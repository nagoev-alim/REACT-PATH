import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Pagination, Users } from './index.js';

const CustomPagination = () => {
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

  // 🚀 RENDER: ================================
  return <div className='custom-pagination'>
    <h1 className='title custom-pagination__title'>Custom Pagination</h1>
    <Users users={users.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
           loading={loading} />
    {!loading &&
      <Pagination
        currentPage={currentPage}
        perPageCount={perPageCount}
        totalUsers={users.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
      />}
  </div>;
};

export default CustomPagination;
