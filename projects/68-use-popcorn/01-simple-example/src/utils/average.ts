/**
 * Функция для вычисления среднего значения элементов в массиве.
 *
 * @param {number[]} arr - Массив чисел.
 * @returns {number} Среднее значение элементов в массиве.
 */
export const average = (arr: number[]) => arr.reduce((acc, cur, _i, arr) => acc + cur / arr.length, 0);
