import { useEffect, useState } from 'react';
import mock from '../mock/mock.js';
import { CaseConverter, LengthConverter, SpeedConverter, TemperatureConverter, WeightConverter } from './index.js';

const Converter = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(
      localStorage.getItem('selectedConverter')
        ? JSON.parse(localStorage.getItem('selectedConverter'))
        : null);
  }, []);

  // 🚀 METHODS: ================================
  const onChange = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      setSelected(null);
      localStorage.clear();
      return;
    }

    const selectedConverter = mock.find(i => i.name === value);
    setSelected(selectedConverter);
    localStorage.setItem('selectedConverter', JSON.stringify(selectedConverter));
  };

  // 🚀 RENDER: ================================
  return <div className='converters'>
    <h1 className='title converters__title'>Simple Converter</h1>

    <select onChange={onChange}>
      <option value=''>Select Converter</option>
      {mock.map(({ name, text }, idx) => <option key={idx} value={name}>{text}</option>)}
    </select>

    {selected !== null &&
      <div className='converters__top'>
        <p>Type a value in any of the fields to convert between <span className='h6'>{selected.name}</span> measurements:</p>
        {selected.name === 'weight' && <WeightConverter values={selected.values} />}
        {selected.name === 'temperature' && <TemperatureConverter values={selected.values} />}
        {selected.name === 'length' && <LengthConverter values={selected.values} />}
        {selected.name === 'speed' && <SpeedConverter values={selected.values} />}
        {selected.name === 'case' && <CaseConverter values={selected.values} />}
      </div>
    }
  </div>;
};

export default Converter;
