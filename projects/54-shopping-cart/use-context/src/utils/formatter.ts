/**
 * @function formatter - Форматтер цен
 * @type {Intl.NumberFormat}
 */
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // Эти параметры нужны для округления до целых чисел, если это то, что вы хотите.
  //minimumFractionDigits: 0, // (достаточно для целых чисел, но например, 2500.10 будет напечатано как $2,500.1)
  //maximumFractionDigits: 0, // (приводит к печати 2500.99 как $2,501)
});
