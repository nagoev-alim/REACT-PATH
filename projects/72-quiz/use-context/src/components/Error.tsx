/**
 * Компонент для отображения сообщения об ошибке.
 *
 * @returns {JSX.Element} Возвращает JSX-элемент с сообщением об ошибке и иконкой.
 */
const Error = () => {
  return (
    <p className='error'>
      <span>💥</span> There was an error fetching questions.
    </p>
  );
};

export default Error;