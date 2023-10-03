/**
 * Перемешивает элементы в массиве случайным образом.
 *
 * @param {string[]} array - Исходный массив, который нужно перемешать.
 * @returns {string[]} - Перемешанный массив.
 */
export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
