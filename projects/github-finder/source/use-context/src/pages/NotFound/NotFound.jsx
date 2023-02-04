import { Link } from 'react-router-dom';
import classes from './NotFound.module.css'

const NotFound = () => {
  return <div className={classes.not_found}>
    <h1 className='h3'>Ups... Not Found.</h1>
    <Link className='button button--primary' to='/'>Go Home</Link>
  </div>;
};

export default NotFound;
