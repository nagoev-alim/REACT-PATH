import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { List, Pagination } from '../components';
import { COLORS, HOME_URL, LIMIT } from '../utils/constants.ts';

interface Pokemon {
  id: string;
  name: string;
  pokemonId: string;
  type: string;
  color: string;
}

interface PokemonData {
  id: number;
  name: string;
  types: {
    0?: {
      slot: number;
      type: {
        name: string;
        url: string;
      }
    },
    1?: {
      slot: number;
      type: {
        name: string;
        url: string;
      }
    }
  };
}
/**
 * Компонент главной страницы приложения.
 * @component
 */
const HomePage = () => {
  const [data, setData] = useState<Pokemon[] | []>(() => {
    const pokedex = localStorage.getItem('pokedex');
    return pokedex ? JSON.parse(pokedex) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPageCount] = useState<number>(10);

  useEffect(() => {
    (async () => {
      try {
        if (data.length === 0) {
          setLoading(true);
          for (let i = 1; i < LIMIT; i++) {
            const {
              data: {
                id,
                name,
                types,
              },
            } = await axios.get<PokemonData>(`${HOME_URL}${i}`);
            const pokemonTypes = types.map(({ type: { name } }) => name);
            const item = {
              id,
              name: name[0].toUpperCase() + name.substring(1),
              pokemonId: id.toString().padStart(3, '0'),
              type: Object.keys(COLORS).find(type => pokemonTypes.indexOf(type) > -1),
              color: COLORS[Object.keys(COLORS).find(type => pokemonTypes.indexOf(type) > -1)],
            };
            setData((v: Pokemon[]): Pokemon[] => {
              const data = [...v, item];
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

  return <>
    <List
      pokemons={data.slice(currentPage * perPageCount - perPageCount, currentPage * perPageCount)}
      loading={loading}
    />
    <Pagination
      currentPage={currentPage}
      total={LIMIT}
      limit={10}
      onPageChange={(page) => setCurrentPage(page)}
      loading={loading}
    />
  </>;
};

export default HomePage;
