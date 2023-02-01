import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Ping } from '@uiball/loaders';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/ability/';

const DetailPage = () => {
  const { id: pokemonID } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/ability/${pokemonID}`);
        const { effect_entries, flavor_text_entries, names, generation: { name } } = data;
        setData({ effect_entries, flavor_text_entries, names, name });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error('Something went wrong, open dev console.');
        console.log(e);
      }
    })();
  }, [pokemonID]);


  return <div className='detail-page'>
    <Link className='button button--primary' to='/'>Back</Link>
    {isLoading
      ? <div className='loading'><Ping size={45} speed={2} color='black' /></div>
      : <div className='detail-page__description'>
        <h1 className='h3'>{data?.names[7]?.name}</h1>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`} alt={data?.name} />
        <p><span className='h6'>Generation:</span> <span>{data?.name}</span></p>
        <p><span className='h6'>Effect:</span> <span>{data?.effect_entries[1]?.short_effect}</span></p>
        <p><span className='h6'>Ability:</span> <span>{data?.flavor_text_entries[0]?.flavor_text}</span></p>
      </div>
    }
  </div>;
};

export default DetailPage;
