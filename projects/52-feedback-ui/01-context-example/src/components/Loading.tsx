import { LineWobble } from '@uiball/loaders';
/**
 * Компонент для отображения индикатора загрузки.
 * @function
 * @name Loading
 * @returns {JSX.Element} React-элемент компонента индикатора загрузки.
 */
const Loading = () => {
  return (
    <div className='grid place-items-center'>
      <LineWobble size={120} lineWeight={5} speed={2.75} />
    </div>
  );
};

export default Loading;
