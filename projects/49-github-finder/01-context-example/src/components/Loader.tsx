import { Ping } from '@uiball/loaders';

/**
 * Функциональный компонент, представляющий анимированный индикатор загрузки.
 *
 * @returns {JSX.Element} JSX элемент, представляющий индикатор загрузки.
 */
const Loader = () => {
  return (
    <div className='grid place-items-center'>
      <Ping size={45} speed={2} color='black' />
    </div>
  );
};

export default Loader;
