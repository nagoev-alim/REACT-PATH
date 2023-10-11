import { ChangeEvent, FormEvent, useState } from 'react';

/**
 * Пропсы для компонента Form.
 * @interface {Object} IFormProps
 * @property {function} onAddItems - Функция для добавления элементов в список.
 * @property {string} description - Описание элемента.
 * @property {number} quantity - Количество элементов.
 */
interface IFormProps {
  onAddItems: ({ description, quantity, packed, id }: { description: string; quantity: number; packed: boolean; id: number}) => void;
}

/**
 * React-компонент формы для добавления элементов в список.
 * @param {IFormProps} props - Пропсы компонента.
 */
const Form = ({ onAddItems }: IFormProps) => {
  /**
   * Состояние для хранения описания элемента.
   * @type {string}
   */
  const [description, setDescription] = useState<string>('');

  /**
   * Состояние для хранения количества элементов.
   * @type {number}
   */
  const [quantity, setQuantity] = useState<number>(1);

  /**
   * Обработчик отправки формы.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!description) return;
    onAddItems({ description, quantity, packed: false, id: Date.now() });
    setDescription('');
    setQuantity(1);
  }

  /**
   * Обработчик изменения количества элементов.
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения количества.
   */
  function handleQuantity(event: ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target as HTMLSelectElement;
    setQuantity(+value);
  }

  /**
   * Обработчик изменения описания элемента.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения описания.
   */
  function handleDescription(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setDescription(value);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={handleQuantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type='text' placeholder='Item...' value={description} onChange={handleDescription} />
      <button type='submit'>Add</button>
    </form>
  );
};

export default Form;
