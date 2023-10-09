import { FiAlertCircle } from 'react-icons/fi';

/**
 * Компонент отображения сообщения об ошибке.
 *
 * @component
 * @returns {JSX.Element} React-элемент компонента сообщения об ошибке.
 */
const Error = () => (
  <div className='grid gap-2 place-items-center'>
    <FiAlertCircle size={35} color={'#fc5859'} />
    <h2 className='font-bold'>Something went wrong</h2>
  </div>
);

export default Error;
