import { capitalStr } from '../utils/capitalStr.ts';
import { ChangeEvent } from 'react';

interface ISpeedConverterProps {
  values: string[];
}

/**
 * React-компонент для конвертации скорости между разными единицами измерения.
 * @function
 * @name SpeedConverter
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.values - Массив строк с именами единиц измерения скорости.
 * @description Этот компонент предназначен для конвертации скорости из одной единицы измерения в другую, такие как мили в час, километры в час, узлы и другие.
 */
const SpeedConverter = ({ values }: ISpeedConverterProps) => {
  /**
   * Обработчик изменения значения в инпуте.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения в инпуте.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const inputValue = parseFloat(target.value);
    const mph = document.querySelector('[data-value="mph"]')!;
    const kph = document.querySelector('[data-value="kph"]')!;
    const knots = document.querySelector('[data-value="knots"]')!;
    const mach = document.querySelector('[data-value="mach"]')!;

    switch (target.dataset.value) {
      case 'mph':
        kph.value = (inputValue * 1.609344).toFixed(2);
        knots.value = (inputValue / 1.150779).toFixed(2);
        mach.value = (inputValue / 761.207).toFixed(4);
        break;
      case 'kph':
        mph.value = (inputValue / 1.609344).toFixed(2);
        knots.value = (inputValue / 1.852).toFixed(2);
        mach.value = (inputValue / 1225.044).toFixed(5);
        break;
      case 'knots':
        mph.value = (inputValue * 1.150779).toFixed(2);
        kph.value = (inputValue * 1.852).toFixed(2);
        mach.value = (inputValue / 661.4708).toFixed(4);
        break;
      case 'mach':
        mph.value = (inputValue * 761.207).toFixed();
        kph.value = (inputValue * 1225.044).toFixed();
        knots.value = (inputValue * 661.4708).toFixed();
        break;
      default:
        break;
    }
  };
  return (
    <div className='grid gap-3'>
      {values.map((i, idx) =>
        <label className='grid gap-1' key={idx}>
          <span className='text-sm font-medium'>{capitalStr(i)}</span>
          <input className='input' type='number' placeholder={capitalStr(i)} data-value={i.toLowerCase()}
                 onChange={handleChange} />
        </label>,
      )}
    </div>
  );
};

export default SpeedConverter;
