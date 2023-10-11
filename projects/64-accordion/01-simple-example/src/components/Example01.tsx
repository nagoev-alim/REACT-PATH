import { useState } from 'react';

/**
 * @type {Array} Массив объектов с данными для вопросов и ответов в аккордеоне.
 * @property {string} title - Заголовок вопроса.
 * @property {string} text - Текст ответа на вопрос.
 */
const data: { title: string; text: string }[] = [
  {
    title: 'Where are these chairs assembled?',
    text:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text:
      'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text:
      'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];
/**
 * React-компонент, представляющий аккордеон.
 * @function
 * @name Example01
 */
const Example01 = () => {
  return (
    <div className='grid gap-2'>
      <h2 className='text-2xl font-bold text-center'>Accordion</h2>
      {data.map((item, index) => (
        <Item key={index} {...item} number={index + 1} />
      ))}
    </div>
  );
};

export default Example01;

/**
 * @interface {Object} IItemProps - Пропсы для компонента Item.
 * @property {number} number - Номер элемента.
 * @property {string} title - Заголовок вопроса.
 * @property {string} text - Текст ответа на вопрос.
 */
interface IItemProps {
  number: number,
  title: string,
  text: string
}

/**
 * React-компонент, представляющий элемент аккордеона.
 * @function
 * @name Item
 * @param {IItemProps} props - Пропсы компонента.
 */
const Item = ({ number, title, text }: IItemProps) => {
  const [open, setOpen] = useState<boolean>(false);

  /**
   * Функция для переключения состояния элемента аккордеона (открыт/закрыт).
   * @function
   * @name handleToggle
   */
  function handleToggle(): void {
    setOpen(v => !v);
  }

  return (
    <div className='bg-white border-2 rounded cursor-pointer' onClick={handleToggle}>
      <div className='flex gap-2 p-2 items-center'>
        <p className='font-bold'>{number <= 10 ? `0${number}` : number}. {title}</p>
        <p className='ml-auto font-bold'>{open ? '-' : '+'}</p>
      </div>
      {open && <div className='p-2 border-t-2'>{text}</div>}
    </div>
  );
};