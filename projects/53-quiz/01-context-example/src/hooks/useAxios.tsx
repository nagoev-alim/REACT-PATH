import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://opentdb.com';

interface IUseAxiosProps {
  params: string;
}

/**
 * Кастомный хук для выполнения HTTP-запросов с использованием библиотеки Axios.
 *
 * @param {Object} props - Параметры для выполнения запроса.
 * @param {string} props.params - URL-путь для отправки запроса.
 * @returns {Object} Объект, содержащий результат запроса, ошибки и состояние загрузки.
 * @property {Object | null} response - Ответ от сервера, может быть null в случае ошибки.
 * @property {string} errors - Строка с описанием ошибки, если она произошла.
 * @property {boolean} isLoading - Флаг, указывающий, выполняется ли загрузка данных.
 */
const useAxios = ({ params }: IUseAxiosProps) => {
  const [response, setResponse] = useState<any | null>(null);
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(params);
        setResponse(data);
      } catch (e) {
        if (e instanceof Error) {
          setErrors(e.message);
          console.log(e);
        }
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
