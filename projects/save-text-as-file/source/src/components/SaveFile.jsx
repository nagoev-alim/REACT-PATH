import { useState } from 'react';
import toast from 'react-hot-toast';

const SaveFile = () => {
  const [mock] = useState([
    { value: 'text/plain', label: 'Text File (.txt)' },
    { value: 'text/javascript', label: 'JS File (.js)' },
    { value: 'text/html', label: 'HTML File (.html)' },
    { value: 'image/svg+xml', label: 'SVG File (.svg)' },
    { value: 'application/msword', label: 'Doc File (.doc)' },
    { value: 'application/vnd.ms-powerpoint', label: 'PPT File (.ppt)' },
  ]);
  const [selected, setSelected] = useState(mock[0].value);
  const [btnLabel, setBtnLabel] = useState(`${mock[0].label.split(' ')[0]}`);
  const [text, setText] = useState('It\'s Only After We\'ve Lost Everything That We\'re Free To Do Anything.');
  const [name, setName] = useState('');

  // 🚀 METHODS: ================================
  const onSelect = ({ target: { value } }) => {
    setBtnLabel(`${mock.find(item => item.value === value).label.split(' ')[0]}`);
    setSelected(value);
  };

  const onSubmit = () => {
    if (name.length === 0) {
      toast.error('Please fill a text field.');
      return;
    }
    const blob = new Blob([text], { type: selected });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  };

  // 🚀 RENDER: ================================
  return <div className='saver'>
    <h1 className='title saver__title'>Save Text As File</h1>
    <textarea spellCheck='false' placeholder='Enter something to save' value={text}
              onChange={({ target: { value } }) => setText(value)} />
    <label>
      <span>File name</span>
      <input type='text' placeholder='Enter file name' value={name}
             onChange={({ target: { value } }) => setName(value)} />
    </label>
    <label>
      <span>Save as</span>
      <select value={selected} onChange={onSelect}>
        {mock.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
    <button className='button button--green button--fluid' onClick={onSubmit}>Save As {btnLabel} File</button>
  </div>;
};

export default SaveFile;
