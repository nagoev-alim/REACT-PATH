import { useAppContext } from '../context/AppContext.tsx';
import { Ring } from '@uiball/loaders';
import { FaTrash } from 'react-icons/fa';

/**
 * React-компонент для отображения списка историй.
 * @function
 * @name Stories
 */
const Stories = () => {
  const { isLoading, hits, removeStory } = useAppContext();
  if (isLoading) {
    return (
      <div className='grid place-items-center'>
        <Ring size={40} lineWeight={5} speed={2} color='black' />
      </div>
    );
  }
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {hits?.map(hit => (
        <div className='grid gap-2 bg-white shadow border rounded p-3' key={hit.objectID}>
          <h3 className='text-blue-600 text-lg font-medium'>{hit.title}</h3>
          <p className='text-neutral-500'>{hit.points} points
            by <span>{hit.author} | </span> {hit.num_comments} {' '} comments</p>
          <div className='flex gap-2'>
            <a className='text-blue-600' target='_blank' rel='noopener noreferrer' href={hit.url}>Read More</a>
            <button onClick={() => removeStory(hit.objectID)}><FaTrash className='text-red-500' /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;