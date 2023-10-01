import { useAppContext } from './context/AppContext.tsx';

/**
 * Компонент для отображения и управления секундомером.
 * @component
 */
const App = () => {
  const { timer, handleStart, handlePause, handleReset } = useAppContext();
  return (
    <div className='max-w-md w-full mx-auto border-2 rounded bg-white p-3 grid gap-3 place-content-center'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>StopWatch</h1>
      <p className='flex gap-1 justify-center font-bold text-7xl'>
        <span>{`${timer.minutes}`.padStart(2, '0')}</span>:
        <span>{`${timer.seconds}`.padStart(2, '0')}</span>
      </p>
      <div className='grid sm:grid-cols-3 gap-2'>
        {[
          { label: 'Start', className: 'bg-green-400 hover:bg-green-500', fn: handleStart },
          { label: 'Pause', className: 'bg-neutral-400 hover:bg-neutral-500', fn: handlePause },
          { label: 'Reset', className: 'bg-red-400 hover:bg-red-500', fn: handleReset },
        ].map(({ label, className, fn }) => (
          <button key={label} className={`btn text-white font-medium ${className}`} onClick={fn}>{label}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
