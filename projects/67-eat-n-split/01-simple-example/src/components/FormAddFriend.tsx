import { ChangeEvent, FormEvent, useState } from 'react';
import { Friend } from '../App.tsx';
import { Button } from './index.ts';
/**
 * Пропсы для компонента FormAddFriend.
 * @interface IFormAddFriendProps
 * @property {function} onAddFriend - Функция для добавления друга.
 */
interface IFormAddFriendProps {
  onAddFriend: (newRecord: Friend) => void;
}
/**
 * React-компонент для формы добавления нового друга.
 * @param {IFormAddFriendProps} props - Пропсы компонента.
 */
const FormAddFriend = ({ onAddFriend }: IFormAddFriendProps) => {
  const [formData, setFormData] = useState<{ name: string; image: string }>({ name: '', image: 'https://i.pravatar.cc/48' });
  /**
   * Обработчик изменения значения в полях формы.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения в поле формы.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  }
  /**
   * Обработчик отправки формы.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!formData.name || !formData.image) {
      return;
    }
    const id = crypto.randomUUID();
    const newEntity: Friend = {
      name: formData.name,
      image: `${formData.image}?u=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newEntity);
    setFormData({ name: '', image: 'https://i.pravatar.cc/48' });
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>👬Friend name</label>
      <input type='text' value={formData.name} name='name' onChange={handleChange} />
      <label>🌄Image URL</label>
      <input type='text' value={formData.image} name='image' onChange={handleChange} />
      <Button>Add</Button>
    </form>
  );
};

export default FormAddFriend;