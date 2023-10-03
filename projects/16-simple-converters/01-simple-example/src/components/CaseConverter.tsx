import { ChangeEvent, useEffect, useState } from 'react';
import { capitalStr } from '../utils/capitalStr.ts';
import _ from 'lodash';

interface ICaseConverterProps {
  values: string[];
}

/**
 * React-компонент для конвертации текста между разными регистрами и стилями написания.
 * @function
 * @name CaseConverter
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.values - Массив строк с именами стилей написания.
 * @description Этот компонент предназначен для конвертации текста в различные стили написания, такие как camelCase, PascalCase, snake_case и другие.
 */
const CaseConverter = ({ values }: ICaseConverterProps) => {
  // Начальное значение текста
  const [text] = useState<string>('lorem ipsum dolor sit amet');

  useEffect(() => {
    if (text) handleChange(text);
  }, []);

  /**
   * Обработчик изменения ввода текста.
   * @param {string} value - Введенный текст.
   */
  function handleChange(value): void {
    // Применение lodash для преобразования текста и обновление соответствующих полей
    document.querySelector('[data-value="camelcase"]')!.value = _.camelCase(value);
    document.querySelector('[data-value="capitalcase"]')!.value = _.startCase(value);
    document.querySelector('[data-value="constantcase"]')!.value = _.upperCase(value).replace(/ /g, '_');
    document.querySelector('[data-value="dotcase"]')!.value = _.lowerCase(value).replace(/ /g, '.');
    document.querySelector('[data-value="headercase"]')!.value = _.startCase(value).replace(/ /g, '-');
    document.querySelector('[data-value="nocase"]')!.value = _.lowerCase(value);
    document.querySelector('[data-value="paramcase"]')!.value = _.lowerCase(value).replace(/ /g, '-');
    document.querySelector('[data-value="pathcase"]')!.value = _.lowerCase(value).replace(/ /g, '/');
    document.querySelector('[data-value="snakecase"]')!.value = _.snakeCase(value);
    document.querySelector('[data-value="sentencecase"]')!.value = _.capitalize(value);
    document.querySelector('[data-value="pascalcase"]')!.value = _.startCase(_.camelCase(value)).replace(/ /g, '');
  }

  return (
    <div className='grid gap-3'>
      <label className='grid gap-1'>
        <span className='text-sm font-medium'>Your string:</span>
        <input className='input' type='text' defaultValue={text}
               onChange={({ target: { value } }) => handleChange(value)} />
      </label>
      {values.map((i, idx) =>
        <label className='grid gap-1' key={idx}>
          <span className='text-sm font-medium'>{capitalStr(i)}</span>
          <input className='input' type='text' readOnly={true} placeholder={capitalStr(i)} data-value={i} />
        </label>,
      )}
    </div>
  );
};

export default CaseConverter;
