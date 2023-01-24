import { capitalStr } from '../utils/capitalStr.js';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const CaseConverter = ({ values }) => {
  const [text, setText] = useState('lorem ipsum dolor sit amet');

  useEffect(() => {
    if (text) {
      converter(text);
    }
  }, []);

  // =====================
  // 🚀 Methods
  // =====================
  const converter = (value) => {
    document.querySelector('[data-value="camelcase"]').value = _.camelCase(value);
    document.querySelector('[data-value="capitalcase"]').value = _.startCase(value);
    document.querySelector('[data-value="constantcase"]').value = _.upperCase(value).replace(/ /g, '_');
    document.querySelector('[data-value="dotcase"]').value = _.lowerCase(value).replace(/ /g, '.');
    document.querySelector('[data-value="headercase"]').value = _.startCase(value).replace(/ /g, '-');
    document.querySelector('[data-value="nocase"]').value = _.lowerCase(value);
    document.querySelector('[data-value="paramcase"]').value = _.lowerCase(value).replace(/ /g, '-');
    document.querySelector('[data-value="pathcase"]').value = _.lowerCase(value).replace(/ /g, '/');
    document.querySelector('[data-value="snakecase"]').value = _.snakeCase(value);
    document.querySelector('[data-value="sentencecase"]').value = _.capitalize(value)
    document.querySelector('[data-value="pascalcase"]').value = _.startCase(_.camelCase(value)).replace(/ /g, '');
  };

  // =====================
  // 🚀 Render
  // =====================
  return <div className='converter__bottom'>
    <label>
      <span>Your string:</span>
      <input type='text' defaultValue={text}
             onChange={({ target: { value } }) => converter(value)} />
    </label>
    {values.map((i, idx) =>
      <label key={idx}>
        <span>{capitalStr(i)}</span>
        <input
          type='text'
          readOnly={true}
          placeholder={capitalStr(i)}
          data-value={i}
        />
      </label>,
    )}
  </div>;
};

export default CaseConverter;
