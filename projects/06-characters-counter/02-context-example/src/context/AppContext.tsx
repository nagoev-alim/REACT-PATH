import { ChangeEvent, createContext, useContext, useState } from 'react';
import { IAppContextProps } from '../types';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Состояние символов и текста в контексте приложения.
   * @type {object}
   * @property {string} text - Текст.
   * @property {number} chars - Количество символов.
   * @property {number} words - Количество слов.
   * @property {number} spaces - Количество пробелов.
   * @property {number} letters - Количество букв.
   */
  const [charactersState, setCharactersState] = useState<{
    text: string;
    chars: number;
    words: number;
    spaces: number;
    letters: number;
  }>({
    text: '',
    chars: 0,
    words: 0,
    spaces: 0,
    letters: 0,
  });

  /**
   * Обработчик изменения текста в поле ввода.
   * @function
   * @param {ChangeEvent<HTMLTextAreaElement>} event - Событие изменения.
   */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target as HTMLTextAreaElement;
    const text = value;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    const spaces = text.split(' ').length - 1;
    const letters = chars - spaces;
    setCharactersState({ text, chars, words, spaces, letters });
  }

  return (
    <AppContext.Provider value={{ charactersState, handleChange }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
