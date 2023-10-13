import { Friend } from '../App.tsx';
import { Button } from './index.ts';
import { FormEvent, useState } from 'react';

/**
 * Пропсы для компонента FormSplitBill.
 * @interface IFormSplitBillProps
 * @property {Friend} selectFriend - Выбранный друг для разделения счета.
 * @property {function} handleSplitBill - Функция для разделения счета.
 */
interface IFormSplitBillProps {
  selectFriend: Friend;
  handleSplitBill: (value: number | string) => void;
}

/**
 * React-компонент для разделения счета с другом.
 * @param {IFormSplitBillProps} props - Пропсы компонента.
 */
const FormSplitBill = ({ selectFriend, handleSplitBill }: IFormSplitBillProps) => {
  const [bill, setBill] = useState<string>('');
  const [paidByUser, setPaidByUser] = useState<string>('');
  const [whoIsPaying, setWhoIsPaying] = useState<string>('user');
  const payingByFriend: number | string = bill ? bill - paidByUser : '';
  /**
   * Обработчик отправки формы для разделения счета.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === 'user' ? payingByFriend : -paidByUser);
  };

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectFriend.name}</h2>
      <label>💰Bill value</label>
      <input type='text' value={bill} onChange={({ target: { value } }) => setBill(+value)} />
      <label>🙎🏻‍Your expense</label>
      <input type='text' value={paidByUser}
             onChange={({ target: { value } }) => setPaidByUser(+value > bill ? paidByUser : +value)} />
      <label>👬{selectFriend.name}'s expense</label>
      <input type='text' disabled value={payingByFriend} />
      <label>🤑 Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={({ target: { value } }) => setWhoIsPaying(value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};

export default FormSplitBill;