/**
 * Интерфейс для представления расходов.
 * @interface Expense
 * @property {number} id - Уникальный идентификатор расхода.
 * @property {string} description - Описание расхода.
 * @property {number} amount - Сумма расхода.
 * @property {string} category - Категория расхода.
 */
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

/**
 * Свойства компонента List.
 * @interface IListProps
 * @property {Expense[]} expenses - Массив объектов расходов.
 * @property {Function} onDelete - Функция обратного вызова для удаления расхода по его идентификатору.
 */
interface IListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

/**
 * Компонент для отображения списка расходов.
 * @function
 * @name List
 * @param {IListProps} props - Свойства компонента List.
 */
const List = ({ expenses, onDelete }: IListProps) => {
  if (expenses.length === 0) {
    return null;
  }

  return (
    <table className='border'>
      <thead>
      <tr>
        <th className='border p-2'>Description</th>
        <th className='border p-2'>Amount</th>
        <th className='border p-2'>Category</th>
        <th className='border p-2'></th>
      </tr>
      </thead>
      <tbody>
      {expenses.map(expense => (
        <tr key={expense.id}>
          <td className='border p-2'>{expense.description}</td>
          <td className='border p-2'>{expense.amount}</td>
          <td className='border p-2'>{expense.category}</td>
          <td className='border p-2'>
            <button className='btn bg-red-200 border-2 border-red-400 hover:bg-red-400'
                    onClick={() => onDelete(expense.id)}>Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
      <tfoot>
      <tr>
        <td className='border p-2'>Total</td>
        <td className='border p-2'>${expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
        <td className='border p-2'></td>
        <td className='border p-2'></td>
      </tr>
      </tfoot>
    </table>
  );
};

export default List;