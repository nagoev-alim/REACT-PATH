interface IWatchedMovieProps {
  imdbID: string,
  poster:string;
  title:string;
  imdbRating:number
  userRating:number
  runtime:number;
  onRemoveWatched: (record: string) => void;
}


const WatchedMovie = ({ imdbID, poster, title, imdbRating, userRating, runtime, onRemoveWatched }: IWatchedMovieProps) => {
  return (
    <li key={imdbID}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
        <button className='btn-delete' onClick={() => onRemoveWatched(imdbID)}>X</button>
      </div>
    </li>
  );
};

export default WatchedMovie;
