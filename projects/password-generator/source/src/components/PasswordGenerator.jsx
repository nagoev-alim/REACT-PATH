import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import toast from 'react-hot-toast';
import { FiClipboard } from 'react-icons/fi';

const MOCK = [
  {
    name: 'lowercase',
    label: 'Lowercase (a-z)',
  },
  {
    name: 'uppercase',
    label: 'Uppercase (A-Z)',
  },
  {
    name: 'numbers',
    label: 'Numbers (0-9)',
  },
  {
    name: 'symbols',
    label: 'Symbols (!-$^+)',
  },
];

const CHARACTERS = {
  lowercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  uppercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  numbers: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbols: () => '!@#$%^&*(){}[]=<>,.'[Math.floor(Math.random() * '!@#$%^&*(){}[]=<>,.'.length)],
};

const PasswordGenerator = () => {
  const [pwd, setPwd] = useState(null);
  const [length, setLength] = useState(15);
  const [pwdStrong, setPwdStrong] = useState('default');

  // 🚀 METHODS: ================================

  const onGeneratePwd = () => {
    let params = null;
    document.querySelectorAll('[data-option]').forEach(option => params = {
      ...params,
      [option.dataset.option]: option.checked,
    });

    if (!Object.values(params).includes(true)) {
      toast.error('Please check minimum one option.');
      return;
    }

    setPwd({ password: generatePassword({ ...params, length }), length });
  };

  const generatePassword = ({ lowercase, uppercase, numbers, symbols, length }) => {
    let result = '';
    const typesCount = lowercase + uppercase + numbers + symbols;
    const typesArray = [{ lowercase }, { uppercase }, { numbers }, { symbols }].filter(i => Object.values(i)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
      typesArray.forEach(t => result += CHARACTERS[Object.keys(t)[0]]());
    }
    const pwdStrong = zxcvbn(result.slice(0, length)).score;

    setPwdStrong(
      pwdStrong === 0 ? 'v-weak'
        : pwdStrong === 1 ? 'weak'
          : pwdStrong === 2 ? 'fear'
            : pwdStrong === 3 ? 'medium'
              : pwdStrong === 4 ? 'strong' : 'default'
    );
    return result.slice(0, length);
  };

  const copyPwd = () => {
    if (pwd === null) return;
    const textarea = document.createElement('textarea');
    textarea.value = pwd.password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    toast.success('Password copied to clipboard.');
  };

  // 🚀 RENDER: ================================
  return <div className='pwd-generator'>
    <h1 className='title pwd-generator__title'>Password Generator</h1>

    <div className='result'>
      <input type='text' defaultValue={pwd ? pwd.password : null} readOnly={true} disabled />
      <button className='clipboard' onClick={copyPwd}><FiClipboard size={25} /></button>
    </div>

    <div className={`indicator indicator--${pwdStrong}`} />

    <div className='length'>
      <span className='label'>Password Length</span>
      <span>{length}</span>
      <input className='length__range' type='range' defaultValue={15} min='1' max='30' step='1'
             onChange={({ target: { value } }) => setLength(Number(value))} />
    </div>

    <ul className='options'>
      {MOCK.map(({ name, label }, idx) =>
        <li key={idx}>
          <label>
            <input className='visually-hidden input-box' type='checkbox' data-option={name}
                   defaultChecked={idx === 0} />
            <span className='checkbox'></span>
            <span className='label'>{label}</span>
          </label>
        </li>,
      )}
    </ul>
    <button className='button button--fluid button--primary' onClick={onGeneratePwd}>Generate Password</button>

  </div>;
};

export default PasswordGenerator;
