import { Friend } from '../App.tsx';
import { Button } from './index.ts';
/**
 * Пропсы для компонента FriendItem.
 * @interface IFriendItemProps
 * @property {function} onSelectFriend - Функция для выбора друга.
 * @property {Friend | null} selectFriend - Выбранный друг.
 * @property {number} id - Идентификатор друга.
 * @property {string} name - Имя друга.
 * @property {string} image - URL изображения друга.
 * @property {number} balance - Баланс друга.
 */
interface IFriendItemProps {
  onSelectFriend: (record: any) => void;
  selectFriend: Friend | null;
  id: number;
  name: string;
  image: string;
  balance: number;
}
/**
 * React-компонент, представляющий информацию о друге и позволяющий выбрать его.
 * @param {IFriendItemProps} props - Пропсы компонента.
 */
const FriendItem = ({ id, name, image, balance, onSelectFriend, selectFriend }: IFriendItemProps) => {
  const isSelected = selectFriend?.id === id;
  return (
    <li className={`${isSelected ? 'selected' : ''}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && <p className='red'>You owe {name} {Math.abs(balance)}€</p>}
      {balance > 0 && <p className='green'>{name} owes you {Math.abs(balance)}€</p>}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button onClick={() => onSelectFriend({ id, name, image, balance })}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
};

export default FriendItem;