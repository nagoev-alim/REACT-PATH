/**
 * @function getRandomNumber - Get random number
 * @param min
 * @param max
 * @returns {number}
 */
export const getRandomNumber = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
