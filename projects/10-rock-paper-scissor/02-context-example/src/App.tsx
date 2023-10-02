import { FC } from 'react';
import rock from '/images/hand-rock.png';
import paper from '/images/hand.png';
import scissors from '/images/hand-scissors.png';
import { useAppContext } from './context/AppContext.tsx';

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
 * @description Главный компонент приложения "".
 */
const App: FC = () => {
  const { scores, message, isEnd, gameMove } = useAppContext();

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
