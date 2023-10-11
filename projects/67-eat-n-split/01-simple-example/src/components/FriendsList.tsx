import { Friend } from '../App.tsx';
import { FriendItem } from './index.ts';

/**
 * Пропсы для компонента FriendsList.
 * @interface IFriendsListProps
 * @property {Friend[]} items - Список друзей для отображения.
 * @property {function} onSelectFriend - Функция для выбора друга.
 * @property {Friend | null} selectFriend - Выбранный друг.
 */
interface IFriendsListProps {
  items: [] | Friend[];
  onSelectFriend: (record: any) => void;
  selectFriend: Friend | null;
}

/**
 * React-компонент для отображения списка друзей.
 * @param {IFriendsListProps} props - Пропсы компонента.
 */
const FriendsList = ({ items, onSelectFriend, selectFriend }: IFriendsListProps) => {
  return (
    <ul>
      {items.map(f => (
        <FriendItem key={f.id} {...f} onSelectFriend={onSelectFriend} selectFriend={selectFriend} />
      ))}
    </ul>
  );
};

export default FriendsList;
