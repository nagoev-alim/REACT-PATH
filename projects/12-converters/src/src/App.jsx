import { FiGithub } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { capitalStr } from './utils/capitalStr.js';
import mock from './mock/mock.js';
import {
  CaseConverter,
  LengthConverter, SpeedConverter, TemperatureConverter, WeightConverter,
} from './components/index.js';

const App = () => {
  // =====================
  // 🚀 Hooks
  // =====================
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(
      localStorage.getItem('selectedConverter')
        ? JSON.parse(localStorage.getItem('selectedConverter'))
        : null);
  }, []);

  // =====================
  // 🚀 Methods
  // =====================
  const onChange = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      setSelected(null);
      localStorage.clear()
      return;
    }

    const selectedConverter = mock.find(i => i.name === value);
    setSelected(selectedConverter);
    localStorage.setItem('selectedConverter', JSON.stringify(selectedConverter));
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='npp'>
    <div className='npp-app'>
      <h1 className='title'>Select Converter</h1>

      <select onChange={onChange}>
        <option value=''>Select Converter</option>
        {mock.map(({ name, text }, idx) => <option key={idx} value={name}>{text}</option>)}
      </select>

      {selected !== null &&
        <div className='converter'>
          <div className='converter__top'>
            <h3>{capitalStr(selected.name)} Converter</h3>
            <p>Type a value in any of the fields to convert between {selected.name} measurements:</p>
          </div>
          {selected.name === 'weight' && <WeightConverter values={selected.values} />}
          {selected.name === 'temperature' && <TemperatureConverter values={selected.values} />}
          {selected.name === 'length' && <LengthConverter values={selected.values} />}
          {selected.name === 'speed' && <SpeedConverter values={selected.values} />}
          {selected.name === 'case' && <CaseConverter values={selected.values} />}
        </div>
      }
    </div>

    <a className='npp-author' href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>;
};

export default App;
