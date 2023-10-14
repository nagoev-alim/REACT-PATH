/**
 * Компонент заголовка приложения.
 *
 * @returns {JSX.Element} Возвращает JSX-элемент, отображающий логотип React и название "The React Quiz".
 */
const Header = () => {
  return (
    <header className='app-header'>
      <img src='/images/logo512.png' alt='React logo' />
      <h1>The React Quiz</h1>
    </header>
  );
};

export default Header;
