import { FiAtSign, FiCalendar, FiGithub, FiLock, FiMap, FiPhone, FiUser } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { DotWave } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MOCK = [
  {
    name: 'name',
    src: <FiUser size={20} />,
  },
  {
    name: 'email',
    src: <FiAtSign size={20} />,
  },
  {
    name: 'age',
    src: <FiCalendar size={20} />,
  },
  {
    name: 'street',
    src: <FiMap size={20} />,
  },
  {
    name: 'phone',
    src: <FiPhone size={20} />,
  },
  {
    name: 'password',
    src: <FiLock size={20} />,
  },
];

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // =====================
  // 🚀 Methods
  // =====================
  /**
   * @function fetchData - Fetch data
   * @returns {Promise<void>}
   */
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: { results } } = await axios.get('https://randomuser.me/api/');

      setUser(()=>{
        const user = {
          phone: results[0].phone,
          email: results[0].email,
          image: results[0].picture.large,
          street: `${results[0].location.street.number} ${results[0].location.street.name}`,
          password: results[0].login.password,
          name: `${results[0].name.first} ${results[0].name.last}`,
          age: results[0].dob.age,
        }

        setActiveBtn({
          label: 'name',
          value: user['name'],
        });

        return user
      });

      setIsLoading(false);
    } catch (e) {
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>

      <div className='random-user'>
        {user && <>
          <h1 className='title'>Random User</h1>
          <img src={user.image} alt='image' />
          <p>
            <span>My {activeBtn && activeBtn.label} is</span>
            <span>{activeBtn && activeBtn.value}</span>
          </p>
          <ul>
            {MOCK.map(({ name, src }) =>
              <li key={name}>
                <button
                  className={`${name === (activeBtn && activeBtn.label) ? 'active' : ''}`}
                  onClick={() => setActiveBtn({
                    label: name,
                    value: user[name],
                  })}>
                  {src}
                </button>
              </li>,
            )}
          </ul>
          <button className='button' onClick={fetchData}>Generate</button>
        </>}

        {isLoading && <div className='loader'>
          <DotWave size={47} speed={1} color='black' />
          <p>Loading...</p>
        </div>}
      </div>

      <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
        <FiGithub size={25} />
      </a>
      <Toaster position='bottom-center' />
    </div>
  </div>;
};

export default App;
