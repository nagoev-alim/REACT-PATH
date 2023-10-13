import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Хук для получения информации о фильме по его идентификатору.
 *
 * @param {string} id - Идентификатор фильма.
 * @returns {[Object, boolean]} Массив, содержащий информацию о фильме и состояние загрузки.
 */
const useFetchMovie = (id) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({});

  useEffect(function() {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://www.omdbapi.com/?apikey=954a6e5b&i=${id}`);
        setValue(response.data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return [value, loading];
};

export default useFetchMovie;
