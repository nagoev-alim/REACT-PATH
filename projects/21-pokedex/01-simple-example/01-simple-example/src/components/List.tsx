import { LineWobble } from '@uiball/loaders';
import { Link } from 'react-router-dom';

/**
 * Интерфейс свойств компонента List.
 * @interface
 */
interface IListProps {
  loading: boolean; // Флаг загрузки данных.
  pokemons: {
    id: string; // Идентификатор покемона.
    name: string; // Имя покемона.
    pokemonId: string; // Номер покемона.
    type: string; // Тип покемона.
    color: string; // Цвет покемона.
  }[];
}

/**
 * Компонент для отображения списка покемонов.
 * @component
 * @param {IListProps} props - Свойства компонента.
 * @param {boolean} props.loading - Флаг загрузки данных. Если true, отображается индикатор загрузки, в противном случае - список покемонов.
 * @param {Object[]} props.pokemons - Массив объектов с данными о покемонах.
 * @param {string} props.pokemons.id - Идентификатор покемона.
 * @param {string} props.pokemons.name - Имя покемона.
 * @param {string} props.pokemons.pokemonId - Номер покемона.
 * @param {string} props.pokemons.type - Тип покемона.
 * @param {string} props.pokemons.color - Цвет покемона.
 */
const List = ({ loading, pokemons }: IListProps) => {
  return (
    loading
      ? (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )
      : (
        <ul className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto w-full'>
          {pokemons.map(({ id, name, pokemonId, type, color }) =>
            <li className='bg-white border-2 rounded overflow-hidden' key={id}>
              <Link to={`detail/${id}`}>
                <div className='flex justify-center p-2' style={{ backgroundColor: color }}>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                       alt={name} />
                </div>
                <div className='grid place-items-center p-3 gap-1'>
                  <span className='bg-neutral-400 p-1 px-1.5 text-white rounded-xl font-medium'>#{pokemonId}</span>
                  <h3 className='font-bold'>{name}</h3>
                  <div className='flex'><p className='font-bold'>Type</p>: {type}</div>
                </div>
              </Link>
            </li>,
          )}
        </ul>
      )
  );
};

export default List;


