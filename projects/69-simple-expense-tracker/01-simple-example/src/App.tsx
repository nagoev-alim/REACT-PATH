import { Filter, Form, List } from './components';
import { useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Simple Expense Tracker".
 */
const App = () => {
  // Состояние для выбранной категории и списка расходов
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'test', amount: 10, category: 'Utilities' },
    { id: 2, description: 'test 2', amount: 10, category: 'Utilities' },
    { id: 3, description: 'test 3', amount: 10, category: 'Utilities' },
  ]);

  /**
   * Обработчик удаления расхода по его идентификатору.
   * @param {number} id - Идентификатор расхода, который нужно удалить.
   */
  function handleDelete(id: number): void {
    setExpenses(expenses.filter(expense => expense.id !== id));
  }

  // Фильтрация расходов по выбранной категории
  const visibleExpenses = selectedCategory
    ? expenses.filter(expenses => expenses.category === selectedCategory)
    : expenses;

  return (
    <div className='max-w-4xl mx-auto w-full grid gap-3 p-3'>
      <h1 className='text-center font-bold text-4xl'>Expense Tracker</h1>
      {/* Форма для добавления нового расхода */}
      <Form onSubmit={expense => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
      {/* Фильтр для выбора категории расходов */}
      <Filter onSelectCategory={category => setSelectedCategory(category)} />
      {/* Список расходов */}
      <List expenses={visibleExpenses} onDelete={(id) => handleDelete(id)} />
    </div>
  );
};

export default App;
