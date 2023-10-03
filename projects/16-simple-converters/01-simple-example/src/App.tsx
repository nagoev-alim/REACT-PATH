import { ChangeEvent, FC, useEffect, useState } from 'react';
import mock from './mock';
import { CaseConverter, LengthConverter, SpeedConverter, TemperatureConverter, WeightConverter } from './components';

interface ValueTypes {
  text: string;
  name: string;
  values: string[];
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Simple Converter".
 */
const App: FC = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const selectedConverter = localStorage.getItem('selectedConverter');
    setSelected(selectedConverter ? JSON.parse(selectedConverter) : null);
  }, []);

  /**
   * Обработчик изменения выбора конвертера в выпадающем списке.
   *
   * @param {ChangeEvent} event - Событие изменения выбранного значения в выпадающем списке.
   */
  function handleChange(event: ChangeEvent): void {
    const { value } = event.target as HTMLSelectElement;
    if (value.trim().length === 0) {
      setSelected(null);
      localStorage.clear();
      return;
    }
    const selectedConverter: ValueTypes[] = mock.find(i => i.name === value);
    setSelected(selectedConverter);
    localStorage.setItem('selectedConverter', JSON.stringify(selectedConverter));
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Simple Converter</h1>
      <select className='input' onChange={handleChange}>
        <option value=''>Select Converter</option>
        {mock.map(({ name, text }, idx) => <option key={idx} value={name}>{text}</option>)}
      </select>
      {selected !== null &&
        <div className='converters__top'>
          <p className='text-center'>Type a value in any of the fields to convert between <span
            className='font-bold'>{selected.name}</span> measurements:</p>
          {selected.name === 'weight' && <WeightConverter values={selected.values} />}
          {selected.name === 'temperature' && <TemperatureConverter values={selected.values} />}
          {selected.name === 'length' && <LengthConverter values={selected.values} />}
          {selected.name === 'speed' && <SpeedConverter values={selected.values} />}
          {selected.name === 'case' && <CaseConverter values={selected.values} />}
        </div>
      }
    </div>
  );
};

export default App;
