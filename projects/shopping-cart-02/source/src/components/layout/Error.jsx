import { FiAlertCircle } from 'react-icons/all.js';


const Error = () => (
  <div className='error'>
    <FiAlertCircle size={35} color={'#fc5859'} />
    <h2 className='h5'>Something went wrong</h2>
  </div>
);

export default Error;
