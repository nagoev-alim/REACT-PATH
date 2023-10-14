/**
 * Генерирует случайное целое число в заданном диапазоне.
 *
 * @param {number} min - Минимальное значение (включительно) диапазона.
 * @param {number} max - Максимальное значение (включительно) диапазона.
 * @returns {number} Случайное целое число в заданном диапазоне.
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};
