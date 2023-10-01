import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Select } from './components';
import { addZero } from './utils/addZero.ts';
import { useAppContext } from './context/AppContext.tsx';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Alarm Clock".
 */
const App: FC = () => {
  const { handleChange, handleSetAlarm, label, btnLabel, formData, imgRef, bodyRef } = useAppContext();
  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Alarm Clock</h1>
      <div className='grid place-items-center gap-3' ref={bodyRef}>
        <img
          ref={imgRef}
          className='w-[100px]'
          src='https://lh3.googleusercontent.com/drive-viewer/AITFw-w0VHGrXur-i4yRzoIKp820T_4W2IuOi2seZCRgAJcJtn-J0iw8zGyENlR14gD9yMRUvGyN4olXizfW1DhcBdGHZx4n=s1600'
          alt='Alarm'
        />
        <p className='font-bold text-center text-5xl'>{label}</p>
        <div className='grid gap-3 w-full sm:grid-cols-3'>
          <Select
            value={formData.hours}
            name='hours'
            dataItems={Array.from({ length: 12 }, (_, i) => addZero(i + 1))}
            handleChange={handleChange}
            label='Hour'
          />
          <Select
            value={formData.minutes}
            name='minutes'
            dataItems={Array.from({ length: 60 }, (_, i) => addZero(i + 1))}
            handleChange={handleChange}
            label='Minute'
          />
          <Select
            value={formData.ampm}
            name='ampm'
            dataItems={['AM', 'PM']}
            handleChange={handleChange}
            label='AM/PM'
          />
        </div>
        <button onClick={handleSetAlarm} className='btn w-full'>{btnLabel}</button>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
