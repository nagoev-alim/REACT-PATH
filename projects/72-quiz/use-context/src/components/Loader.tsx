/**
 * Компонент загрузки.
 *
 * @returns {JSX.Element} Возвращает JSX-элемент, отображающий индикатор загрузки и текст "Загрузка вопросов...".
 */
const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='loader'></div>
      <p>Loading questions...</p>
    </div>
  );
};

export default Loader;
