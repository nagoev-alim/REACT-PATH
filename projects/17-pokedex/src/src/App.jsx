import { FiGithub } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { Pagination, Pokedex } from './components/index.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const COLORS = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [data, setData] = useState(localStorage.getItem('pokedex') ? JSON.parse(localStorage.getItem('pokedex')) : []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        if (data.length === 0) {
          setLoading(true);

          for (let i = 1; i < 50; i++) {
            const { data: { id, name, types } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemonTypes = types.map(({ type: { name } }) => name);

            const item = {
              id,
              name: name[0].toUpperCase() + name.substring(1),
              pokemonId: id.toString().padStart(3, '0'),
              type: Object.keys(COLORS).find(type => pokemonTypes.indexOf(type) > -1),
              color: COLORS[Object.keys(COLORS).find(type => pokemonTypes.indexOf(type) > -1)],
            };

            setData(prev => {
              const data = [...prev, item];
              localStorage.setItem('pokedex', JSON.stringify(data));
              return data;
            });
          }

          setLoading(false);
        }
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
        <h1 className='title'>Pokedex</h1>
        <Pokedex pokemons={data.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
                 loading={loading} />
        {!loading && <Pagination
          currentPage={currentPage}
          total={50}
          limit={10}
          onPageChange={(page) => setCurrentPage(page)}
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
