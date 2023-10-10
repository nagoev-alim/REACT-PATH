import { useState } from 'react';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {

  return (
    <div className='max-w-4xl w-full p-3 grid gap-3'>
      <h1 className='text-center font-bold text-4xl'>Text Expander</h1>
      <div className='grid gap-3'>
        <TextExpander>
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science fiction,
          but believe it or not, space travel is a real thing. Humans and robots
          are constantly venturing out into the cosmos to uncover its secrets and
          push the boundaries of what's possible.
        </TextExpander>
        <TextExpander
          collapsedNumWords={20}
          expandButtonText='Show text'
          collapseButtonText='Collapse text'
          buttonColor='#ff6622'
        >
          Space travel requires some seriously amazing technology and
          collaboration between countries, private companies, and international
          space organizations. And while it's not always easy (or cheap), the
          results are out of this world. Think about the first time humans stepped
          foot on the moon or when rovers were sent to roam around on Mars.
        </TextExpander>
        <TextExpander expanded={true} className='box'>
          Space missions have given us incredible insights into our universe and
          have inspired future generations to keep reaching for the stars. Space
          travel is a pretty cool thing to think about. Who knows what we'll
          discover next!
        </TextExpander>
      </div>
    </div>
  );
};

export default App;

/**
 * Интерфейс для пропсов TextExpander.
 * @interface
 */
interface ITextExpanderProps {
  children: React.ReactNode;    // Дочерние элементы компонента.
  collapsedNumWords?: number;  // Количество слов, видимых в свернутом состоянии.
  expandButtonText?: string;   // Текст кнопки "Показать текст".
  collapseButtonText?: string; // Текст кнопки "Свернуть текст".
  buttonColor?: string;       // Цвет кнопки.
  expanded?: boolean;          // Флаг расширенного состояния по умолчанию.
  className?: string;          // Дополнительные классы стиля компонента.
}

/**
 * Компонент TextExpander.
 * @function
 * @name TextExpander
 * @param {ITextExpanderProps} props - Пропсы компонента.
 */
const TextExpander = (
  {
    children,
    collapsedNumWords = 20,
    expandButtonText = 'Show more',
    collapseButtonText = 'Show less',
    buttonColor = '#1f09cd',
    expanded = false,
    className = '',
  }: ITextExpanderProps) => {
  const [toggle, setToggle] = useState<boolean>(expanded);

  return (
    <div className={`border-2 bg-white rounded p-3 ${className}`}>
      <span>{toggle ? children : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...'}</span>
      <button className='btn ml-1' onClick={() => setToggle(v => !v)}>
        {toggle ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};