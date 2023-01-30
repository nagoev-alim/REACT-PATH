import { useState } from 'react';
import { useAppHook } from '../../context/AppContext.jsx';
import { actionHandlers } from '../../context/AppActions.js';

const Select = ({ label, options, name }) => {
  const [value, setValue] = useState('');
  const { dispatch } = useAppHook();

  // 🚀 METHODS: ================================
  const onChange = ({ target: { value } }) => {
    setValue(value);

    switch (label) {
      case 'Category':
        dispatch(actionHandlers.category(value));
        break;
      case 'Difficulty':
        dispatch(actionHandlers.difficulty(value));
        break;
      case 'Type':
        dispatch(actionHandlers.type(value));
        break;
      default:
        break;
    }
  };

  // 🚀 RENDER: ================================
  return <select name={name} value={value} onChange={onChange}>
    <option value=''>Select {label}</option>
    {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
  </select>;
};

export default Select;
