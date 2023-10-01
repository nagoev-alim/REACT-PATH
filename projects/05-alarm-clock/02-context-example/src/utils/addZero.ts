/**
 * Преобразует число в строку с ведущим нулем, если число меньше 10.
 *
 * @param {number} n - Число для преобразования.
 * @return {string} Преобразованная строка.
 */
export const addZero = (n: number): string => (n < 10 ? `0${n}` : n).toString();
