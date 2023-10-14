import { LineWobble } from '@uiball/loaders';

/**
 * Компонент отображения индикатора загрузки.
 *
 * @component
 * @returns {JSX.Element} React-элемент компонента индикатора загрузки.
 */
const Loading = () => (
  <div className='grid place-items-center'>
    <LineWobble size={120} lineWeight={5} speed={2.75} />
  </div>
);

export default Loading;
