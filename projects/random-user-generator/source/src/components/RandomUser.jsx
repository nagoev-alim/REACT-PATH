import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DotWave } from '@uiball/loaders';
import { FiAtSign, FiCalendar, FiLock, FiMap, FiPhone, FiUser } from 'react-icons/fi';

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

const RandomUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  // 🚀 METHODS: ================================
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      const { data: { results } } = await axios.get('https://randomuser.me/api/');

      setUser(() => {
        const user = {
          phone: results[0].phone,
          email: results[0].email,
          image: results[0].picture.large,
          street: `${results[0].location.street.number} ${results[0].location.street.name}`,
          password: results[0].login.password,
          name: `${results[0].name.first} ${results[0].name.last}`,
          age: results[0].dob.age,
        };

        setActiveBtn({
          label: 'name',
          value: user['name'],
        });

        return user;
      });

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setUser(null);
      toast.error('Something went wrong, open dev console.');
      console.log(e);
    }
  };

  // 🚀 RENDER: ================================
  return <div className='random-user'>
    {user && <>
      <h1 className='title random-user__title'>Random User</h1>
      <img className='random-user__image' src={user.image} alt='image' />
      <p className='random-user__text'>
        <span>My {activeBtn && activeBtn.label} is</span>
        <span className='h6'>{activeBtn && activeBtn.value}</span>
      </p>
      <ul className='random-user__list'>
        {MOCK.map(({ name, src }) =>
          <li key={name}>
            <button
              className={`button ${name === (activeBtn && activeBtn.label) ? 'button--primary' : ''}`}
              onClick={() => setActiveBtn({
                label: name,
                value: user[name],
              })}>
              {src}
            </button>
          </li>,
        )}
      </ul>
      <button className='button button--primary' onClick={fetchData}>Generate</button>
    </>}

    {isLoading && <div className='loader'>
      <DotWave size={47} speed={1} color='black' />
      <p>Loading</p>
    </div>}
  </div>;
};


export default RandomUser;
