import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Ping } from '@uiball/loaders';
import { DETAIL_URL } from '../utils/constants.ts';

axios.defaults.baseURL = DETAIL_URL;
/**
 * Компонент страницы детализации покемона.
 * @component
 */
const DetailPage = () => {
  const { id: pokemonID } = useParams<string>(); // Извлечение параметра "id" из URL, представляющего идентификатор покемона.
  const [data, setData] = useState<[] | null>(null); // Состояние для хранения данных о покемоне.
  const [isLoading, setIsLoading] = useState<boolean>(false); // Флаг загрузки данных.

  useEffect(() => {
    (async () => {
      setIsLoading(true); // Установка флага загрузки в true.
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/ability/${pokemonID}`);
        const { effect_entries, flavor_text_entries, names, generation: { name } } = data;
        setData({ effect_entries, flavor_text_entries, names, name }); // Сохранение данных о покемоне в состояние "data".
        setIsLoading(false); // Установка флага загрузки в false после успешной загрузки данных.
      } catch (e) {
        setIsLoading(false); // Установка флага загрузки в false в случае ошибки.
        toast.error('Something went wrong, open dev console.'); // Вывод уведомления об ошибке.
        console.log(e); // Вывод ошибки в консоль для дополнительной информации.
      }
    })();
  }, [pokemonID]);

  return (
    <div className='grid place-items-center gap-3 max-w-4xl mx-auto w-full'>
      <Link className='btn mr-auto' to='/'>Back</Link>
      {isLoading
        ? (
          <div className='loading'>
            <Ping size={45} speed={2} color='black' />
          </div>)
        : (
          <div className='bg-white border-2 rounded p-3'>
            <h1 className='text-center font-bold text-2xl'>{data?.names[7]?.name}</h1>
            <img className='mx-auto'
                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`}
                 alt={data?.name} />
            <p className='grid grid-cols-2'>
              <span className='p-2 border font-bold bg-gray-100'>Generation:</span>
              <span className='p-2 border'>{data?.name}</span>
            </p>
            <p className='grid grid-cols-2'>
              <span className='p-2 border font-bold bg-gray-100'>Effect:</span>
              <span className='p-2 border'>{data?.effect_entries[1]?.short_effect}</span>
            </p>
            <p className='grid grid-cols-2'>
              <span className='p-2 border font-bold bg-gray-100'>Ability:</span>
              <span className='p-2 border'>{data?.flavor_text_entries[0]?.flavor_text}</span>
            </p>
          </div>
        )
      }
    </div>
  );
};

export default DetailPage;
