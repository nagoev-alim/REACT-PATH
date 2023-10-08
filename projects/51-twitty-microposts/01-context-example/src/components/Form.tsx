import toast from 'react-hot-toast';
import { FormEvent, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';
import { actionHandlers } from '../context/AppActions.tsx';
/**
 * Компонент формы для создания или обновления поста.
 * @function
 * @name Form
 * @returns {JSX.Element} React-элемент компонента формы.
 */
const Form = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [btnLabel, setBtnLabel] = useState<string>('Add new post');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const { dispatch, editStatus } = useAppContext();

  useEffect(() => {
    if (editStatus.isEdit) {
      setTitle(editStatus.item.title);
      setBody(editStatus.item.body);
      setBtnLabel('Update post');
    }
  }, [editStatus]);

  /**
   * Обработчик отправки формы.
   * @async
   * @function
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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
  }
  /**
   * Отправляет данные на сервер.
   * @async
   * @function
   * @param {Object} post - Объект с данными поста.
   * @returns {Promise<void>}
   */
  async function postData(post): Promise<void> {
    try {
      dispatch({ type: TYPES.LOADING });
      if (editStatus.isEdit) {
        dispatch({
          type: TYPES.UPDATE_POST,
          payload: {
            data: await actionHandlers.updatePost(Number(editStatus.item.id), post),
            id: Number(editStatus.item.id),
          },
        });
        dispatch({
          type: TYPES.EDIT_POST,
          payload: {
            item: {},
            isEdit: false,
          },
        });
        dispatch({
          type: TYPES.FETCH_POSTS,
          payload: await actionHandlers.fetchPosts(),
        });
        toast.success('Post successfully updated.');
      } else {
        dispatch({
          type: TYPES.ADD_POST,
          payload: await actionHandlers.addPost(post),
        });
        toast.success('Post successfully created.');
      }
      dispatch({ type: TYPES.LOADING });
    } catch (e) {
      dispatch({ type: TYPES.ERROR, payload: true });
      console.log(e);
    }
  }

  return (
    <form className='grid gap-2 bg-white p-2 border-2 rounded' onSubmit={handleSubmit}>
      <h3 className='font-bold'>{btnLabel}</h3>
      <input
        className='input'
        type='text'
        name='title'
        placeholder='Title'
        minLength='3'
        value={title}
        onChange={({ target: { value } }) => setTitle(value)} />
      <textarea
        className='input min-h-[140px] resize-none'
        name='body'
        placeholder='Body'
        minLength='3'
        value={body}
        onChange={({ target: { value } }) => setBody(value)} />
      <button className='btn' type='submit' disabled={btnDisabled}>
        {btnLabel}
      </button>
    </form>
  );
};

export default Form;
