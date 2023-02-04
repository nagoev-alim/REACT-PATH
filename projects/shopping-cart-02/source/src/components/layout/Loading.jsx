import { LineWobble } from '@uiball/loaders';

const Loading = () => (
  <div className='loader'>
    <LineWobble size={120} lineWeight={5} speed={2.75} />
  </div>
);

export default Loading;
