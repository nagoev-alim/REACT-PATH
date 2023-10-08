import { useAppContext } from '../context/AppContext.tsx';
import toast from 'react-hot-toast';
import { TYPES } from '../utils/constants.ts';
import { actionHandlers } from '../context/AppActions.tsx';
import { DotWave } from '@uiball/loaders';

/**
 * Компонент для отображения постов.
 * @function
 * @name Posts
 * @returns {JSX.Element} React-элемент компонента для отображения постов.
 */
const Posts = () => {
  const { dispatch, posts, isLoading, isError } = useAppContext();

  /**
   * Обработчик удаления поста.
   * @async
   * @function
   * @param {number} id - Идентификатор поста для удаления.
   * @returns {Promise<void>}
   */
  async function handleDelete(id: string): Promise<void> {
    if (confirm('Are you sure?')) {
      dispatch({ type: TYPES.LOADING });
      dispatch({
        type: TYPES.DELETE_POST,
        payload: await actionHandlers.deletePost(id),
      });
      dispatch({
        type: TYPES.FETCH_POSTS,
        payload: await actionHandlers.fetchPosts(),
      });
      dispatch({ type: TYPES.LOADING });
      toast.success('Post successfully deleted.');
    }
  }

  /**
   * Обработчик обновления поста.
   * @async
   * @function
   * @param {Object} item - Объект поста для обновления.
   * @returns {Promise<void>}
   */
  async function handleUpdate(item: {
    body: string;
    id: string;
    title: string
  }): Promise<void> {
    console.log(item);
    dispatch({
      type: TYPES.EDIT_POST,
      payload: { item, isEdit: true },
    });
  }

  if (isError) {
    return <h3 className='text-3xl font-bold text-center'>Something went wrong...</h3>;
  }

  if (!isLoading && (!posts || posts.length === 0)) {
    return <h3 className='text-3xl font-bold text-center'>No posts yet</h3>;
  }

  return (
    isLoading
      ? (
        <div className='grid place-items-center'>
          <DotWave size={47} speed={1} color='black' />
          <p>Loading</p>
        </div>
      )
      : (
        <ul className='grid gap-3'>
          {posts.map(({ id, title, body }) => (
            <li className='bg-white border-2 p-3 rounded gap-2 grid' key={id}>
              <h3 className='font-bold'>{title}</h3>
              <p>{body}</p>
              <div className='grid grid-cols-2 gap-2'>
                <button className='btn border-2 bg-red-200 hover:bg-red-300 border-red-400'
                        onClick={() => handleDelete(id)}>Delete
                </button>
                <button className='btn border-2 bg-blue-200 hover:bg-blue-300 border-blue-400'
                        onClick={() => handleUpdate({ id, title, body })}>Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      )
  );
};

export default Posts;
