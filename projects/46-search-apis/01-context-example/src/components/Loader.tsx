import { Ping } from '@uiball/loaders';

/**
 * Компонент для отображения индикатора загрузки.
 * @function
 * @name Loader
 * @description Этот компонент предназначен для отображения индикатора загрузки с анимацией "Ping".
 */
const Loader = () => {
  return (
    <div className='grid place-items-center'>
      <Ping size={45} speed={2} color='black' />
    </div>
  );
};

export default Loader;
