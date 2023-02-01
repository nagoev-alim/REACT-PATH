import { LineWobble } from '@uiball/loaders';
import { Link } from 'react-router-dom';

const List = ({ loading, pokemons }) => (
  loading
    ? <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>
    : <ul className='items'>
      {pokemons.map(({ id, name, pokemonId, type, color }) =>
        <li key={id}>
          <Link to={`/detail/${id}`}>
            <div className='header' style={{backgroundColor: color}}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
            </div>
            <div className='body'>
              <span>#{pokemonId}</span>
              <h3>{name}</h3>
              <div><p>Type</p>: {type}</div>
            </div>
          </Link>
        </li>,
      )}
    </ul>
);

export default List;


