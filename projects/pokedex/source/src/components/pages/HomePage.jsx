import { List, Pagination } from '../index.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

const LIMIT = 30

const HomePage = () => {
  const [data, setData] = useState(localStorage.getItem('pokedex') ? JSON.parse(localStorage.getItem('pokedex')) : []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        if (data.length === 0) {
          setLoading(true);

          for (let i = 1; i < LIMIT; i++) {
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

  // 🚀 RENDER: ================================
  return <>
    <List pokemons={data.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
          loading={loading} />
    {!loading &&
      <Pagination currentPage={currentPage} total={LIMIT} limit={10} onPageChange={(page) => setCurrentPage(page)}
      />}
  </>;
};

export default HomePage;
