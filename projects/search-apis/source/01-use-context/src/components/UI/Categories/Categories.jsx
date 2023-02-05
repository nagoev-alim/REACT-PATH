import { useContextHook } from '../../../context/app-context.jsx';
import { Error, Loader } from '../../index.js';
import classes from './Categories.module.css';


const Categories = () => {
  const { categories, activeCategory, loading, error, fetchCategory } = useContextHook();
  // 🚀 RENDER: ================================
  if (loading) return <Loader />;
  if (error) return <Error />;
  return !loading && categories && <section className={classes.categories}>
    <h2>Categories ({categories.count})</h2>
    <ul>
      {categories.categories.map(item =>
        <li key={item.toLowerCase()}>
          <button className={`button ${item === activeCategory ? 'button--green' : ''}`}
                  onClick={async () => await fetchCategory(item)}>{item}</button>
        </li>,
      )}
    </ul>
  </section>;
};

export default Categories;
