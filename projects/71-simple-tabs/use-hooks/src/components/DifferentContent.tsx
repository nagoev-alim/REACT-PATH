/**
 * Компонент для отображения разного контента внутри вкладки.
 * Этот компонент сбрасывает состояние при смене вкладки.
 *
 * @returns {JSX.Element} Возвращает JSX-элемент с разным контентом.
 */
const DifferentContent = () => {
  return (
    <div className='tab-content'>
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
};

export default DifferentContent;