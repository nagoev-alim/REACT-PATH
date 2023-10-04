import { Action, IAppState, Transaction } from '../types';
import { ACTION_TYPES } from '../utils/constants.ts';


/**
 * Функция обновления баланса.
 *
 * @param {Transaction[]} transactions - Массив транзакций.
 * @returns {Object} - Объект с балансом, доходом и расходом.
 * @property {number} balance - Общий баланс.
 * @property {number} income - Сумма доходов.
 * @property {number} expense - Сумма расходов.
 */
function updateBalance(transactions: Transaction[]): { balance: number, income: number, expense: number } {
  const amounts = transactions.map(({ amount }) => amount);
  const balance = +amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);
  const income = +amounts.filter(item => item > 0).reduce((acc, item) => (acc + item), 0).toFixed(2);
  const expense = parseInt((amounts.filter(item => item < 0).reduce((acc, item) => (acc + item), 0) * -1).toFixed(2));
  return {
    balance,
    income,
    expense,
  };
}

/**
 * Редуктор для управления состоянием.
 * @param {IAppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {IAppState} Новое состояние.
 */
export const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {

    case ACTION_TYPES.UPDATE_BALANCE: {
      const { balance, income, expense } = updateBalance(action.payload);
      return { ...state, balance, income, expense };
    }

    case ACTION_TYPES.SET_TRANSACTIONS: {
      return { ...state, transactions: action.payload };
    }

    case ACTION_TYPES.DELETE_ITEM: {
      let transactions = [...state.transactions];
      transactions = transactions.filter(({ id }) => id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      let { balance, income, expense } = updateBalance(transactions);
      return { ...state, transactions, balance, income, expense };
    }
    default:
      return state;
  }
};
