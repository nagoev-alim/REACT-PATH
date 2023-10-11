import { useEffect, useState } from 'react';

/**
 * Хук для управления состоянием в локальном хранилище браузера.
 *
 * @param {*} initialState - Начальное значение состояния.
 * @param {string} key - Ключ для хранения значения в локальном хранилище.
 * @returns {Array} - Массив, содержащий текущее значение состояния и функцию для его обновления.
 */
const useLocalStorageState = (initialState, key) => {
  // Получение значения из локального хранилища или использование начального значения
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) || initialState);

  useEffect(function() {
    // Сохранение значения в локальном хранилище при его изменении
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorageState;
