import { useEffect, useState } from 'react';
import apiClient from '../services/api-client.ts';
import { AxiosRequestConfig, CanceledError } from 'axios';
/**
 * Интерфейс для представления ответа от API.
 * @interface FetchResponse
 * @property {number} count - Количество результатов.
 * @property {T[]} results - Массив результатов.
 */

interface FetchResponse<T> {
  count: number;
  results: T[];
}
/**
 * Кастомный хук для получения данных из API.
 *
 * @template T - Тип данных, ожидаемых из API.
 * @param {string} endpoint - Эндпоинт API, по которому будет выполняться запрос.
 * @param {AxiosRequestConfig} [requestConfig] - Конфигурация запроса Axios.
 * @param {Array} [deps] - Зависимости для запуска хука.
 * @returns {{data: T[] | [], error: string, isLoading: boolean}} Объект, содержащий данные, ошибку и состояние загрузки.
 */
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[] | []>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function() {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient.get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then(response => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return function() {
      return controller.abort();
    };
  }, deps ? [...deps] : []);

  return {
    data, error, isLoading,
  };
};

export default useData;