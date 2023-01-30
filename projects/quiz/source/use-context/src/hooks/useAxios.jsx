import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://opentdb.com';

const useAxios = ({ params }) => {
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(params);
        setResponse(data);
      } catch (e) {
        setErrors(e);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  return {
    response,
    errors,
    isLoading,
  };
};

export default useAxios;
