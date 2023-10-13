import { useState } from 'react';
import { Form, PackingList, Stats } from './components';

interface Item {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Far Away".
 */
const App = () => {
  /**
   * Состояние для хранения списка элементов, которые необходимо упаковать.
   * @type {Array}
   */
  const [items, setItems] = useState<Item[] | []>([]);

  /**
   * Обработчик добавления элементов в список.
   * @function
   * @name handleAddItems
   * @param item - Добавляемый элемент.
   */
  function handleAddItems(item: Item) {
    setItems((items) => [...items, item]);
  }

  /**
   * Обработчик удаления элемента из списка.
   * @function
   * @name handleDeleteItem
   * @param {number} id - Идентификатор удаляемого элемента.
   */
  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  /**
   * Обработчик переключения статуса упаковки элемента.
   * @function
   * @name handleToggleItem
   * @param {number} id - Идентификатор элемента, для которого меняется статус упаковки.
   */
  function handleToggleItem(id: number) {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  function handleClearList() {
    confirm('Are you sure you want to delete all items?') && setItems([]);
  }

  return (
    <div className='app'>
      <h1>🏝️ Far Away 🧳</h1>
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
