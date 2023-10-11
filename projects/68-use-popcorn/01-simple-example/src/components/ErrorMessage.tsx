interface IErrorMessageProps {
  message: string;
}

/**
 * Компонент для отображения сообщения об ошибке.
 *
 * @param {IErrorMessageProps} props - Пропсы компонента.
 * @param {string} props.message - Текст сообщения об ошибке.
 */
const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <p className='error'><span> ⛔️ </span>{message}</p>
  );
};

export default ErrorMessage;
