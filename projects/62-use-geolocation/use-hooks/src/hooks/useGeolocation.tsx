import { useState } from 'react';

/**
 * Пользовательский хук для получения геопозиции.
 *
 * @function
 * @name useGeolocation
 * @returns {object} Объект с информацией о геопозиции и функцией запроса геопозиции.
 */
const useGeolocation = () => {
  /**
   * Состояние, указывающее на процесс загрузки данных о геопозиции.
   *
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Состояние, хранящее текстовое описание ошибки (если возникла ошибка) или null, если ошибки нет.
   *
   * @type {string | null}
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Состояние, содержащее координаты геопозиции, включая широту (lat) и долготу (lng), или пустой объект {} в случае отсутствия данных.
   *
   * @type {object | { lat: number, lng: number }}
   */
  const [position, setPosition] = useState<{ lat: number; lng: number } | {}>({});

  /**
   * Функция для запроса геопозиции пользователя.
   * Если браузер не поддерживает геолокацию, устанавливает текст ошибки. В противном случае, производит запрос геопозиции и обрабатывает результат.
   */
  function getPosition() {
    if (!navigator.geolocation) return setError('Your browser does not support geolocation');

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return {
    isLoading,
    error,
    position,
    getPosition,
  };
};

export default useGeolocation;