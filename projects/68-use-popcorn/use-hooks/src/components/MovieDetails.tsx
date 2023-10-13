import { useEffect, useRef, useState } from 'react';
import { Loader, StarRating } from './index.ts';
import useKey from '../hooks/useKey.jsx';
import useTitle from '../hooks/useTitle.jsx';
import useFetchMovie from '../hooks/useFetchMovie.jsx';

interface IMovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (record: {}) => void;
  watched: [];
}

/**
 * Компонент для отображения деталей фильма.
 *
 * @param {object} props - Свойства компонента.
 * @param {string} props.selectedId - Идентификатор выбранного фильма.
 * @param {function} props.onCloseMovie - Функция для закрытия деталей фильма.
 * @param {function} props.onAddWatched - Функция для добавления фильма в список просмотренных.
 * @param {object[]} props.watched - Массив фильмов, добавленных в список просмотренных.
 */
const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }: IMovieDetailsProps) => {
  const [userRating, setUserRating] = useState<string>('');
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
  const countRef = useRef<number>(0);

  useEffect(function() {
    if (userRating) countRef.current++;
  }, [userRating]);

  const [movie, loading] = useFetchMovie(selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useTitle(title);
  useKey('Escape', onCloseMovie);

  /**
   * Обработчик добавления фильма в список просмотренных.
   */
  function handleAdd() {
    onAddWatched({
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    });
    onCloseMovie();
  }

  return (
    <div className='details'>
      {loading
        ? <Loader />
        : (<>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt={`Poster for ${title}`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p> {genre}</p>
              <p><span>⭐️</span>{imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ?
                (<>
                  <StarRating length={10} size={24} onSetRatingCallback={setUserRating} />
                  {userRating > 0 && <button className='btn-add' onClick={handleAdd}>+ Add to list</button>}
                </>)
                : (<p>You rated this movie {watchedUserRating} ⭐️</p>)
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p> <p>Directed by {director}</p>
          </section>
        </>)
      }
    </div>
  );
};

export default MovieDetails;
