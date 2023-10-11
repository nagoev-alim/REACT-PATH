import { average } from '../utils/average.ts';

interface Movie {
  countRatingDecisions: number;
  imdbID: string;
  imdbRating: number;
  poster: string;
  runtime: number;
  title: string;
  userRating: number;
  year: string;
}

interface IWatchedSummaryProps {
  watched: Movie[];
}

const WatchedSummary = ({ watched }: IWatchedSummaryProps) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
