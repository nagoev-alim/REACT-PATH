import { capitalStr } from '../../utils/capitalStr.js';

const TemperatureConverter = ({ values }) => {
  // 🚀 METHODS: ================================
  const converter = (target) => {
    const inputValue = parseFloat(target.value);
    const fahrenheit = document.querySelector('[data-value="fahrenheit"]');
    const celsius = document.querySelector('[data-value="celsius"]');
    const kelvin = document.querySelector('[data-value="kelvin"]');

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
  };

  // 🚀 RENDER: ================================
  return <div className='converters__bottom'>
    {values.map((i, idx) =>
      <label key={idx}>
        <span>{capitalStr(i)}</span>
        <input type='number' placeholder={capitalStr(i)} data-value={i} onChange={({ target }) => converter(target)} />
      </label>,
    )}
  </div>;
};

export default TemperatureConverter;
