import { FiGithub } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import classes from './AppWrapper.module.css';


const AppWrapper = ({ children }) => (
  <div className={classes.npp}>
    <div className={classes.wrapper}>
      {children}
    </div>
    <a className={classes.nppAuthor} href='https://github.com/nagoev-alim' target='_blank'>
      <FiGithub size={25} />
    </a>
    <Toaster position='bottom-center' />
  </div>
);

export default AppWrapper;
