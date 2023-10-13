import { ChangeEvent, useState } from 'react';
import { Item } from './index.ts';

/**
 * Пропсы для компонента PackingList.
 * @interface {Object} IPackingListProps
 * @property {Object[]} items - Массив элементов списка.
 * @property {string} items[].description - Описание элемента.
 * @property {number} items[].quantity - Количество элементов.
 * @property {boolean} items[].packed - Флаг состояния элемента (упакован/не упакован).
 * @property {number} items[].id - Идентификатор элемента.
 * @property {function} onDeleteItem - Функция для удаления элемента из списка по его идентификатору.
 * @property {function} onToggleItem - Функция для изменения состояния элемента (упакован/не упакован) по его идентификатору.
 * @property {function} onClearList - Функция для очистки списка.
 */
interface IPackingListProps {
  items: {
    description: string;
    quantity: number;
    packed: boolean;
    id: number;
  }[],
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
}

/**
 * React-компонент списка элементов с упаковкой.
 * @param {IPackingListProps} props - Пропсы компонента.
 */
const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }: IPackingListProps) => {
  /**
   * Состояние для хранения выбранного метода сортировки.
   * @type {string}
   */
  const [sortBy, setSortBy] = useState<string>('input');
  let sortedItems;

  switch (sortBy) {
    case 'input':
      sortedItems = items;
      break;
    case 'description':
      sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
      break;
    case 'packed':
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
  }

  /**
   * Обработчик изменения метода сортировки.
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения выбранного метода сортировки.
   */
  function handleSetSortBy(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setSortBy(value);
  }

  return (
    <div className='list'>
      <ul>
        {sortedItems && sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} id={item.id} />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={handleSetSortBy}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
};

export default PackingList;
