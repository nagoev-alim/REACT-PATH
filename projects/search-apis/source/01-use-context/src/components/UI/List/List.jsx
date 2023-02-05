import { useContextHook } from '../../../context/app-context.jsx';
import { Error, Loader } from '../../index.js';
import classes from './List.module.css';


const List = () => {
  const { category, loading, error } = useContextHook();
  // 🚀 RENDER: ================================
  if (loading) return <Loader />;
  if (error) return <Error />;
  return !loading && category && <section className={classes.category}>
    <h2>List API ({category.count})</h2>
    <ul>
      {category.entries.map((item, idx) =>
        <li className='button' key={idx}>
          <a href={item.Link} target='_blank'>
            {['API', 'Description', 'Auth', 'Cors', 'Category']
              .map((key, keyIdx) =>
                <p key={keyIdx}>
                  <span>{keyIdx === 0 ? 'Title' : key}:</span>
                  <span>{item[key] === '' ? '-' : item[key]}</span>
                </p>,
              )}
          </a>
        </li>,
      )}
    </ul>
  </section>;
};

export default List;
