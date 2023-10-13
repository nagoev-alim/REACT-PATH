import mock from './mock';
import { useState } from 'react';
import { Button, FormAddFriend, FormSplitBill, FriendsList } from './components';

/**
 * @interface {Object} Friend - Описание друга.
 * @property {number} id - Уникальный идентификатор друга.
 * @property {string} name - Имя друга.
 * @property {string} image - URL изображения друга.
 * @property {number} balance - Баланс друга.
 */
export interface Friend {
  id: number;
  name: string;
  image: string;
  balance: number;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Eat-n-Split".
 */
const App = () => {
  /**
   * Состояние для отображения или скрытия формы добавления друга.
   * @type {boolean}
   */
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);

  /**
   * Состояние для хранения списка друзей.
   * @type {Friend[]}
   */
  const [friends, setFriends] = useState<Friend[] | []>(mock);

  /**
   * Состояние для хранения выбранного друга.
   * @type {Friend | null}
   */
  const [selectFriend, setSelectFriend] = useState<Friend | null>(null);

  /**
   * Обработчик добавления друга в список.
   * @function
   * @name handleAddFriend
   * @param {Friend} newRecord - Новый друг для добавления.
   */
  function handleAddFriend(newRecord: Friend): void {
    setFriends(v => [...v, newRecord]);
    setShowAddFriend(false);
  }

  /**
   * Обработчик выбора друга из списка.
   * @function
   * @name handleSelectFriend
   * @param {Friend} record - Выбранный друг.
   */
  function handleSelectFriend(record: Friend): void {
    setSelectFriend(v => v?.id === record.id ? null : record);
    setShowAddFriend(false);
  }

  /**
   * Обработчик разделения счета между друзьями.
   * @function
   * @name handleSplitBill
   * @param {number | string} value - Сумма разделения счета.
   */
  function handleSplitBill(value: number | string): void {
    setFriends(v => v.map((f) => f.id === selectFriend.id ? { ...f, balance: f.balance + value } : f));
    setSelectFriend(null);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList items={friends} onSelectFriend={handleSelectFriend} selectFriend={selectFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(v => !v)}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {selectFriend && (
        <FormSplitBill selectFriend={selectFriend} handleSplitBill={handleSplitBill} key={selectFriend.id} />
      )}
    </div>
  );
};

export default App;
