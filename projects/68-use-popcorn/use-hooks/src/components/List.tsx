import { Movie, WatchedMovie } from './index.ts';

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

interface IListProps {
  type: string;
  items: Movie[];
  onSelected?: (record: string) => void;
  onRemoveWatched?: (record: string) => void;
}

/**
 * Компонент для отображения списка фильмов или просмотренных фильмов.
 *
 * @param {object} props - Свойства компонента.
 * @param {string} props.type - Тип списка ('movies' или 'watched').
 * @param {object[]} props.items - Список элементов для отображения.
 * @param {function} props.onSelected - Функция для обработки выбора элемента.
 * @param {function} props.onRemoveWatched - Функция для удаления просмотренного фильма.
 */
const List = ({ type, items, onSelected, onRemoveWatched }: IListProps) => {
  let content = null;
  switch (type) {
    case 'movies':
      content = (
        <ul className='list list-movies'>{items?.map((movie) =>
          <Movie key={movie.imdbID} {...movie} onSelected={onSelected} />)}
        </ul>
      );
      break;
    case 'watched':
      content = (
        <ul className='list list-watched'>{items?.map((movie) =>
          <WatchedMovie key={movie.imdbID} {...movie} onRemoveWatched={onRemoveWatched} />)}
        </ul>
      );
      break;
  }
  return content;
};

export default List;
