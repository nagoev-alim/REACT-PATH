import { useState } from 'react';
import useMovies from './hooks/useMovies.tsx';
import useLocalStorageState from './hooks/useLocalStorageState.tsx';
import {
  Box,
  ErrorMessage,
  List,
  Loader,
  Logo,
  Main,
  MovieDetails,
  NavBar,
  ResultsNumber,
  Search,
  WatchedSummary,
} from './components';

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

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "MovieSearch".
 */
const App = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { movies, loading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  /**
   * Обработчик выбора фильма по ID.
   *
   * @param {number} id - Идентификатор фильма.
   */
  function handleSelectId(id: number): void {
    setSelectedId(v => id === v ? null : id);
  }

  /**
   * Обработчик закрытия деталей фильма.
   */
  function handleCloseMovie(): void {
    setSelectedId(null);
  }

  /**
   * Обработчик добавления фильма в список просмотренных.
   *
   * @param {Movie} entry - Информация о фильме.
   */
  function handleAddWatched(entry: Movie): void {
    setWatched(v => [...v, entry]);
  }

  /**
   * Обработчик удаления фильма из списка просмотренных.
   *
   * @param {string} id - Идентификатор фильма.
   */
  function handleRemoveWatched(id: string): void {
    setWatched(v => v.filter(m => m.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <ResultsNumber items={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && <List type='movies' items={movies} onSelected={handleSelectId} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId
            ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            )
            : (
              <>
                <WatchedSummary watched={watched} />
                <List type='watched' items={watched} onRemoveWatched={handleRemoveWatched} />
              </>
            )
          }
        </Box>
      </Main>
    </>
  );
};

export default App;
