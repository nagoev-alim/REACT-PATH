import { DotWave } from '@uiball/loaders';
import { useAppHook } from '../../context/AppContext.jsx';
import { DELETE_POST, EDIT_POST, FETCH_POSTS, LOADING } from '../../context/constant.js';
import { actionHandlers } from '../../context/AppActions.js';
import toast from 'react-hot-toast';

const Posts = () => {
  const { dispatch, posts, isLoading, isError } = useAppHook();

  // 🚀 METHODS: ================================
  const onDelete = async (id) => {
    if (confirm('Are you sure?')) {
      dispatch({ type: LOADING });
      dispatch({
        type: DELETE_POST,
        payload: await actionHandlers.deletePost(id),
      });
      dispatch({
        type: FETCH_POSTS,
        payload: await actionHandlers.fetchPosts(),
      });
      dispatch({ type: LOADING });
      toast.success('Post successfully deleted.');
    }
  };

  const onUpdate = async (item) => {
    dispatch({
      type: EDIT_POST,
      payload: {
        item,
        isEdit: true,
      },
    });
  };

  // 🚀 RENDER: ================================
  if (isError) return <h3 className='h4'>Something went wrong...</h3>;

  if (!isLoading && (!posts || posts.length === 0)) return <h3 className='h5 empty'>No posts yet</h3>;

  return isLoading
    ? <div className='loader'>
      <DotWave size={47} speed={1} color='black' />
      <p>Loading</p>
    </div>
    : <ul className='microposts__posts'>
      {posts.map(({ id, title, body }) => <li key={id}>
        <h3 className='h4'>{title}</h3>
        <p>{body}</p>
        <div className='buttons'>
          <button className='button button--red' onClick={() => onDelete(id)}>Delete</button>
          <button className='button button--blue' onClick={() => onUpdate({ id, title, body })}>Update</button>
        </div>
      </li>)}
    </ul>;
};


export default Posts;
