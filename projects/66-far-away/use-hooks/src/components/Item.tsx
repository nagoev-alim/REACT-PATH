/**
 * Пропсы для компонента Item.
 * @interface {Object} IItemProps
 * @property {Object} item - Информация о элементе списка.
 * @property {string} item.description - Описание элемента.
 * @property {number} item.quantity - Количество элементов.
 * @property {boolean} item.packed - Флаг состояния элемента (упакован/не упакован).
 * @property {number} item.id - Идентификатор элемента.
 * @property {function} onDeleteItem - Функция для удаления элемента из списка по его идентификатору.
 * @property {function} onToggleItem - Функция для изменения состояния элемента (упакован/не упакован) по его идентификатору.
 */
interface IItemProps {
  item: {
    description: string;
    quantity: number;
    packed: boolean;
    id: number
  };
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

/**
 * React-компонент отдельного элемента списка.
 * @param {IItemProps} props - Пропсы компонента.
 */
const Item = ({ item: { description, quantity, packed, id }, onDeleteItem, onToggleItem }: IItemProps) => {
  return (
    <li>
      <input type='checkbox' value={packed} onChange={() => onToggleItem(id)} />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>{quantity} {description}</span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
};

export default Item;
