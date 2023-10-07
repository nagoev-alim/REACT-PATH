import { FiAlertCircle } from 'react-icons/fi';

/**
 * Компонент для отображения сообщения об ошибке.
 * @function
 * @name Error
 * @description Этот компонент предназначен для отображения сообщения об ошибке и иконки предупреждения.
 */
const Error = () => {
  return (
    <div className=''>
      <FiAlertCircle size={35} color={'#fc5859'} />
      <h2 className='font-bold'>Something went wrong</h2>
    </div>
  );
};

export default Error;
