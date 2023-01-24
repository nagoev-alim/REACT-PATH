import { capitalStr } from '../utils/capitalStr.js';

const WeightConverter = ({values}) => {
  // =====================
  // 🚀 Methods
  // =====================
  const converter = (target) => {
    const inputValue = parseFloat(target.value);
    const pounds = document.querySelector('[data-value="pounds"]');
    const ounces = document.querySelector('[data-value="ounces"]');
    const stones = document.querySelector('[data-value="stones"]');
    const kilograms = document.querySelector('[data-value="kilograms"]');
    const grams = document.querySelector('[data-value="grams"]');

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
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='converter__bottom'>
    {values.map((i, idx) =>
      <label key={idx}>
        <span>{capitalStr(i)}</span>
        <input
          type='number'
          placeholder={capitalStr(i)}
          data-value={i}
          onChange={({ target }) => converter(target)}
        />
      </label>,
    )}
  </div>;
};

export default WeightConverter;
