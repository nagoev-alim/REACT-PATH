import { capitalStr } from '../utils/capitalStr.ts';
import { ChangeEvent } from 'react';

interface IWeightConverterProps {
  values: string[];
}

/**
 * Компонент WeightConverter для конвертации весовых единиц.
 *
 * @function
 * @name WeightConverter
 *
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.values - Массив строк с названиями единиц измерения.
 *
 * @returns {JSX.Element} Элемент React, представляющий компонент конвертера веса.
 */
const WeightConverter = ({ values }: IWeightConverterProps) => {
  /**
   * Обработчик изменения значения в инпуте.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения в инпуте.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const inputValue = parseFloat(target.value);
    const pounds = document.querySelector('[data-value="pounds"]')!;
    const ounces = document.querySelector('[data-value="ounces"]')!;
    const stones = document.querySelector('[data-value="stones"]')!;
    const kilograms = document.querySelector('[data-value="kilograms"]')!;
    const grams = document.querySelector('[data-value="grams"]')!;

    switch (target.dataset.value) {
      case 'pounds':
        kilograms.value = (inputValue / 2.2046).toFixed(2);
        ounces.value = (inputValue * 16).toFixed(2);
        grams.value = (inputValue / 0.0022046).toFixed();
        stones.value = (inputValue * 0.071429).toFixed(3);
        break;
      case 'ounces':
        pounds.value = (inputValue * 0.062500).toFixed(4);
        kilograms.value = (inputValue / 35.274).toFixed(4);
        grams.value = (inputValue / 0.035274).toFixed(1);
        stones.value = (inputValue * 0.0044643).toFixed(4);
        break;
      case 'stones':
        pounds.value = (inputValue * 14).toFixed(1);
        kilograms.value = (inputValue / 0.15747).toFixed(1);
        ounces.value = (inputValue * 224).toFixed();
        grams.value = (inputValue / 0.00015747).toFixed();
        break;
      case 'kilograms':
        pounds.value = (inputValue * 2.2046).toFixed(2);
        ounces.value = (inputValue * 35.274).toFixed(2);
        grams.value = (inputValue * 1000).toFixed();
        stones.value = (inputValue * 0.1574).toFixed(3);
        break;
      case 'grams':
        pounds.value = (inputValue * 0.0022046).toFixed(4);
        kilograms.value = (inputValue / 1000).toFixed(4);
        ounces.value = (inputValue * 0.035274).toFixed(3);
        stones.value = (inputValue * 0.00015747).toFixed(5);
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

export default WeightConverter;
