import { createContext, useContext, useState } from 'react';
import { IAppContextProps } from '../types';
import confetti from 'canvas-confetti';
import { getRandomNumber } from '../utils/getRandomNumber.ts';
import { capitalStr } from '../utils/capitalStr.ts';

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
export const AppProvider = ({ children }: {
  children: React.ReactNode
}) => {
  // Состояние счета игры между пользователем и компьютером.
  const [scores, setScores] = useState<{
    user: number;
    computer: number;
  }>({ user: 0, computer: 0 });
  // Состояние сообщения о текущем состоянии игры.
  const [message, setMessage] = useState<string>('Get Started, Let\'s Rock!');
  // Состояние окончания игры.
  const [isEnd, setIsEnd] = useState<boolean>(false);

  /**
   * Функция для обработки хода игры.
   *
   * @param {string} userChoice - Выбор пользователя ('rock', 'paper' или 'scissors').
   */
  function gameMove(userChoice: string): void {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    switch (`${computerChoice}-${userChoice}`) {
      case 'rock-paper':
      case 'paper-scissors':
      case 'scissors-rock':
        optionGame(userChoice, computerChoice, 'win');
        break;
      case 'paper-rock':
      case 'scissors-paper':
      case 'rock-scissors':
        optionGame(userChoice, computerChoice, 'lose');
        break;
      case 'rock-rock':
      case 'scissors-scissors':
      case 'paper-paper':
        optionGame(userChoice, computerChoice, 'draw');
        break;
      default:
        break;
    }
  }

  /**
   * Функция для обработки хода игры и изменения счета.
   *
   * @param {string} userChoice - Выбор пользователя ('rock', 'paper' или 'scissors').
   * @param {string} computerChoice - Случайный выбор компьютера ('rock', 'paper' или 'scissors').
   * @param {string} type - Результат хода ('win', 'lose' или 'draw').
   */
  function optionGame(userChoice: string, computerChoice: string, type: string) {
    setScores(v => {
      let user = v.user;
      let computer = v.computer;
      switch (type) {
        case 'draw':
          user++;
          computer++;
          break;
        case 'win':
          user++;
          break;
        case 'lose':
          computer++;
          break;
        default:
          break;
      }
      if (user === 3 && computer === 3) {
        setIsEnd(true);
        setMessage('DRAW 🤝');
      } else if (user === 3) {
        setIsEnd(true);
        setMessage('You WIN 🥳');
        confetti({
          angle: getRandomNumber(55, 125),
          spread: getRandomNumber(50, 70),
          particleCount: getRandomNumber(50, 100),
          origin: { y: 0.6 },
        });
      } else if (computer === 3) {
        setIsEnd(true);
        setMessage('You LOSE 🤥');
      }
      return { user, computer };
    });

    setMessage(`
      ${capitalStr(userChoice)} <span class='text-sm'>(user)</span>
      ${type === 'win' ? 'beats' : type === 'lose' ? 'lose' : 'equals'}
      ${capitalStr(computerChoice)} <span class='text-sm'>(comp)</span>`);
  }

  return (
    <AppContext.Provider value={{ scores, message, isEnd, gameMove, optionGame }}>
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
