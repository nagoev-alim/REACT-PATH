import { FiAlertCircle } from 'react-icons/fi';

/**
 * Компонент для отображения сообщения об ошибке.
 * @function
 * @name Error
 * @returns {JSX.Element} React-элемент компонента сообщения об ошибке.
 */
const Error = () => {
  return (
    <div className='grid place-items-center gap-2'>
      <FiAlertCircle size={35} color={'#fc5859'} />
      <h2 className='font-bold'>Something went wrong</h2>
    </div>
  );
};

export default Error;
