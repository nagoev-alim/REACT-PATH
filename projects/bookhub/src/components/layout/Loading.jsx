import { LineWobble } from '@uiball/loaders';

const Loading = () => (
  <div className='loader'>
    <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
  </div>
);

export default Loading;
