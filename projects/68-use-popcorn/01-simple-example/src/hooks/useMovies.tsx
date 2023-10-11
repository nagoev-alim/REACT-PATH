import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Generates a function comment for the given function body.
 *
 * @param {string} query - the query string to search for movies
 * @return {Object} an object containing movies, loading, and error properties
 */
const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function() {
    // Abort controller
    const controller = new AbortController();

    // Check if the query is less than 3 characters
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    // Fetch movies
    (async function() {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://www.omdbapi.com/?apikey=954a6e5b&s=${query}`, { signal: controller.signal });
        if (response.status !== 200) {
          throw new Error('Something went wrong with fetching movies');
        }
        if (response.data.Response === 'False') {
          throw new Error('Movie not found');
        }
        setMovies(response.data.Search);
        setError('');
      } catch (e) {
        if (e.name !== 'AbortErgor') {
          console.log(e.message);
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    })();

    // handleCloseMovie();
    return function() {
      return controller.abort();
    };
  }, [query]);

  return {
    movies,
    loading,
    error,
  };
};

export default useMovies;
