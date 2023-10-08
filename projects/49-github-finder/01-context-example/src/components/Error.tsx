import { FiAlertCircle } from 'react-icons/fi';
/**
 * Отображает сообщение об ошибке с иконкой и текстом.
 * @returns {JSX.Element} JSX-элемент, представляющий компонент ошибки.
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
