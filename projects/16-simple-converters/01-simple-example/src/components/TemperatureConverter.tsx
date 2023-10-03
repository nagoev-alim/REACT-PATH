import { ChangeEvent } from 'react';
import { capitalStr } from '../utils/capitalStr';

interface ITemperatureConverterProps {
  values: string[];
}

/**
 * React-компонент для конвертации температуры.
 * @function
 * @name TemperatureConverter
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.values - Массив строк с именами единиц измерения температуры.
 * @description Этот компонент предназначен для конвертации температуры между различными единицами измерения.
 */
const TemperatureConverter = ({ values }: ITemperatureConverterProps) => {
  /**
   * Обработчик изменения значения ввода температуры.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения ввода.
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const inputValue = parseFloat(target.value);
    const fahrenheit = document.querySelector('[data-value="fahrenheit"]')!;
    const celsius = document.querySelector('[data-value="celsius"]')!;
    const kelvin = document.querySelector('[data-value="kelvin"]')!;

    switch (target.dataset.value) {
      case 'fahrenheit':
        celsius.value = ((inputValue - 32) / 1.8).toFixed(2);
        kelvin.value = (((inputValue - 32) / 1.8) + 273.15).toFixed(2);
        break;
      case 'celsius':
        fahrenheit.value = ((inputValue * 1.8) + 32).toFixed(2);
        kelvin.value = ((inputValue) + 273.15).toFixed(2);
        break;
      case 'kelvin':
        fahrenheit.value = (((inputValue - 273.15) * 1.8) + 32).toFixed(2);
        celsius.value = ((inputValue) - 273.15).toFixed(2);
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

export default TemperatureConverter;
