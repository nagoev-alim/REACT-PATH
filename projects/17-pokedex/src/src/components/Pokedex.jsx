/**
 * @function Users
 * @param loading
 * @param pokemons
 * @return {JSX.Element}
 * @constructor
 */
const Pokedex = ({ loading, pokemons }) => (
  loading
    ? <p className='loading'>Loading...</p>
    : <ul className='items'>
      {pokemons.map(({ id, name, pokemonId, type, color }) =>
        <li key={id}>
          <div className='header' style={{backgroundColor: color}}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
          </div>
          <div className='body'>
            <span>#{pokemonId}</span>
            <h3>{name}</h3>
            <div><p>Type</p>: {type}</div>
          </div>
        </li>,
      )}
    </ul>
);

export default Pokedex;
