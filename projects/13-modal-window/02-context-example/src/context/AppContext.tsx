import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IAppContextProps } from '../types';
import mock from '../mock';
import { toast } from 'react-hot-toast';

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(function() {
    document.addEventListener('keyup', handleKeyUp);
    return function() {
      return document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  /**
   * Обработчик события клавиши клавиатуры.
   *
   * @param {KeyboardEvent} event - Событие клавиши клавиатуры.
   */
  function handleKeyUp(event: KeyboardEvent): void {
    const { key } = event;
    if (key === 'Escape') {
      setModalOpen(false);
    }
  }

  /**
   * Переключает состояние модального окна.
   */
  function toggleModal(): void {
    setModalOpen(v => !v);
  }

  return (
    <AppContext.Provider value={{ modalOpen, toggleModal }}>
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
