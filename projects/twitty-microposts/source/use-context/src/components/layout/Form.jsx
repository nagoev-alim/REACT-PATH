import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppHook } from '../../context/AppContext.jsx';
import { ADD_POST, EDIT_POST, ERROR, FETCH_POSTS, LOADING, UPDATE_POST } from '../../context/constant.js';
import { actionHandlers } from '../../context/AppActions.js';

const Form = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [btnLabel, setBtnLabel] = useState('Add new post');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { dispatch, editStatus } = useAppHook();

  useEffect(() => {
    if (editStatus.isEdit === true) {
      setTitle(editStatus.item.title);
      setBody(editStatus.item.body);
      setBtnLabel('Update post');
    }
  }, [editStatus]);

  // 🚀 METHODS: ================================
  const onSubmit = async (event) => {
    event.preventDefault();
    if (title.trim().length === 0 || body.trim().length === 0) {
      toast.error('Please fill the fields.');
      return;
    }
    setBtnDisabled(true);
    await postData({ title, body });
    setBtnDisabled(false);
    setBtnLabel('Add new Post');
    setBody('');
    setTitle('');
  };

  const postData = async (post) => {
    try {
      dispatch({ type: LOADING });
      // Update Post
      if (editStatus.isEdit === true) {
        dispatch({
          type: UPDATE_POST,
          payload: {
            data: await actionHandlers.updatePost(Number(editStatus.item.id), post),
            id: Number(editStatus.item.id),
          },
        });
        dispatch({
          type: EDIT_POST,
          payload: {
            item: {},
            isEdit: false,
          },
        });
        dispatch({
          type: FETCH_POSTS,
          payload: await actionHandlers.fetchPosts(),
        });
        toast.success('Post successfully updated.');
      } else {
        // Create Post
        dispatch({
          type: ADD_POST,
          payload: await actionHandlers.addPost(post),
        });
        toast.success('Post successfully created.');
      }

      dispatch({ type: LOADING });
    } catch (e) {
      dispatch({ type: ERROR, payload: true });
      console.log(e);
    }
  };

  // 🚀 RENDER: ================================
  return <form className='microposts__form' onSubmit={onSubmit}>
    <h3 className='h4'>{btnLabel}</h3>
    <input
      type='text'
      name='title'
      placeholder='Title'
      minLength='3'
      value={title}
      onChange={({ target: { value } }) => setTitle(value)} />
    <textarea
      name='body'
      minLength='3'
      placeholder='Body'
      value={body}
      onChange={({ target: { value } }) => setBody(value)} />
    <button
      className='button button--fluid button--primary'
      type='submit'
      disabled={btnDisabled}
    >{btnLabel}</button>
  </form>;
};

export default Form;
