import { ChangeEvent } from 'react';
import { capitalStr } from '../utils/capitalStr.ts';

interface ILengthConverterProps {
  values: string[];
}

/**
 * React-компонент для конвертации длины между разными единицами измерения.
 * @function
 * @name LengthConverter
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.values - Массив строк с именами единиц измерения длины.
 * @description Этот компонент предназначен для конвертации длины из одной единицы измерения в другую, такие как футы, метры, мили и другие.
 */
const LengthConverter = ({ values }: ILengthConverterProps) => {
  /**
   * Обработчик изменения значения в инпуте.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения в инпуте.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const inputValue = parseFloat(target.value);
    const feet = document.querySelector('[data-value="feet"]')!;
    const inches = document.querySelector('[data-value="inches"]')!;
    const yards = document.querySelector('[data-value="yards"]')!;
    const miles = document.querySelector('[data-value="miles"]')!;
    const meters = document.querySelector('[data-value="meters"]')!;
    const cm = document.querySelector('[data-value="cm"]')!;
    const kilometers = document.querySelector('[data-value="kilometers"]')!;

    switch (target.dataset.value) {
      case 'feet':
        meters.value = (inputValue / 3.2808).toFixed(2);
        inches.value = (inputValue * 12).toFixed(2);
        cm.value = (inputValue / 0.032808).toFixed();
        yards.value = (inputValue * 0.33333).toFixed(2);
        kilometers.value = (inputValue / 3280.8).toFixed(5);
        miles.value = (inputValue * 0.00018939).toFixed(5);
        break;
      case 'inches':
        feet.value = (inputValue * 0.083333).toFixed(3);
        meters.value = (inputValue / 39.370).toFixed(3);
        cm.value = (inputValue / 0.39370).toFixed(2);
        yards.value = (inputValue * 0.027778).toFixed(3);
        kilometers.value = (inputValue / 39370).toFixed(6);
        miles.value = (inputValue * 0.000015783).toFixed(6);
        break;
      case 'yards':
        feet.value = (inputValue * 3).toFixed();
        meters.value = (inputValue / 1.0936).toFixed(2);
        inches.value = (inputValue * 36).toFixed();
        cm.value = (inputValue / 0.010936).toFixed();
        kilometers.value = (inputValue / 1093.6).toFixed(5);
        miles.value = (inputValue * 0.00056818).toFixed(5);
        break;
      case 'miles':
        feet.value = (inputValue * 5280).toFixed();
        meters.value = (inputValue / 0.00062137).toFixed();
        inches.value = (inputValue * 63360).toFixed();
        cm.value = (inputValue / 0.0000062137).toFixed();
        yards.value = (inputValue * 1760).toFixed();
        kilometers.value = (inputValue / 0.62137).toFixed(2);
        break;
      case 'meters':
        feet.value = (inputValue * 3.2808).toFixed(2);
        inches.value = (inputValue * 39.370).toFixed(2);
        cm.value = (inputValue / 0.01).toFixed();
        yards.value = (inputValue * 1.0936).toFixed(2);
        kilometers.value = (inputValue / 1000).toFixed(5);
        miles.value = (inputValue * 0.00062137).toFixed(5);
        break;
      case 'cm':
        feet.value = (inputValue * 0.032808).toFixed(3);
        meters.value = (inputValue / 100).toFixed(3);
        inches.value = (inputValue * 0.39370).toFixed(2);
        yards.value = (inputValue * 0.010936).toFixed(3);
        kilometers.value = (inputValue / 100000).toFixed(6);
        miles.value = (inputValue * 0.0000062137).toFixed(6);
        break;
      case 'kilometers':
        feet.value = (inputValue * 3280.8).toFixed();
        meters.value = (inputValue * 1000).toFixed();
        inches.value = (inputValue * 39370).toFixed();
        cm.value = (inputValue * 100000).toFixed();
        yards.value = (inputValue * 1093.6).toFixed();
        miles.value = (inputValue * 0.62137).toFixed(2);
        break;
      default:
        break;
    }
  }

  return (
    <div className='grid gap-3'>
      {values.map((i, idx) =>
        <label className='grid gap-1' key={idx}>
          <span className='text-sm font-medium'>{capitalStr(i)}</span>
          <input className='input' type='number' placeholder={capitalStr(i)} data-value={i} onChange={handleChange} />
        </label>,
      )}
    </div>
  );
};

export default LengthConverter;
