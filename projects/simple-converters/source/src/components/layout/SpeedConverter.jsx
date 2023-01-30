import { capitalStr } from '../../utils/capitalStr.js';

const SpeedConverter = ({ values }) => {
  // 🚀 METHODS: ================================
  const converter = (target) => {
    const inputValue = parseFloat(target.value);
    const mph = document.querySelector('[data-value="mph"]');
    const kph = document.querySelector('[data-value="kph"]');
    const knots = document.querySelector('[data-value="knots"]');
    const mach = document.querySelector('[data-value="mach"]');

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

  // 🚀 RENDER: ================================
  return <div className='converters__bottom'>
    {values.map((i, idx) =>
      <label key={idx}>
        <span>{capitalStr(i)}</span>
        <input type='number' placeholder={capitalStr(i)} data-value={i.toLowerCase()}
               onChange={({ target }) => converter(target)} />
      </label>,
    )}
  </div>;
};

export default SpeedConverter;
