import { FC, useState } from 'react';
import confetti from 'canvas-confetti';
import rock from '/images/hand-rock.png';
import paper from '/images/hand.png';
import scissors from '/images/hand-scissors.png';
import { getRandomNumber } from './utils/getRandomNumber.ts';
import { capitalStr } from './utils/capitalStr.ts';

const data: {
  name: string,
  src: string
}[] = [
  { name: 'rock', src: rock },
  { name: 'paper', src: paper },
  { name: 'scissors', src: scissors },
];

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Rock Paper Scissors".
 */
const App: FC = () => {
  // Состояние счета игры между пользователем и компьютером
  const [scores, setScores] = useState<{
    user: number;
    computer: number;
  }>({ user: 0, computer: 0 });
  // Состояние сообщения о текущем состоянии игры
  const [message, setMessage] = useState<string>('Get Started, Let\'s Rock!');
  // Состояние окончания игры
  const [isEnd, setIsEnd] = useState<boolean>(false);

  /**
   * Функция, представляющая ход игры.
   *
   * @param {string} userChoice - Выбор пользователя ('rock', 'paper' или 'scissors').
   */
  function gameMove(userChoice: string) {
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
    <div className='border-2 rounded max-w-xl w-full p-3 grid gap-4 md:p-5 bg-white'>
      <h1 className='text-center font-bold text-4xl'>Rock Paper Scissors</h1>
      <main>
        <div
          className='border-4 border-black relative font-bold text-6xl md:text-8xl flex justify-center items-center p-10'>
          <span className='absolute top-1/2 -translate-y-1/2  text-sm left-0 p-2 bg-red-400 text-white'>user</span>
          <span className='absolute top-1/2 -translate-y-1/2  text-sm right-0 p-2 bg-red-400 text-white'>computer</span>
          <span>{scores.user}</span>:<span>{scores.computer}</span>
        </div>
        <p className='text-center text-2xl font-bold my-2' dangerouslySetInnerHTML={{ __html: message }} />
        {!isEnd && <ul className='options grid gap-4 grid-cols-3 justify-items-center max-w-md mx-auto'>
          {data.map(({ name, src }, idx) =>
            <li key={idx}>
              <button className='border-4 border-black w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] p-2 rounded-full'
                      onClick={() => gameMove(name)}>
                <img className='pointer-events-none' src={src} alt={name} />
              </button>
            </li>,
          )}
        </ul>}
      </main>
      <footer className='text-center grid place-items-center gap-3'>
        {!isEnd && <p>Make your move.</p>}
        {isEnd && <button className='btn text-white border-red-400 bg-red-400 hover:bg-red-500'
                          onClick={() => location.reload()}>Repeat Game</button>}
      </footer>
    </div>
  );
};

export default App;
