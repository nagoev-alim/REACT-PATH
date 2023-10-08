import { useAppContext } from '../context/AppContext.tsx';
import { TYPES } from '../utils/constants.ts';
import { actions } from '../context/AppActions.tsx';
import { Loading, Error } from './index.ts';

/**
 * Компонент для отображения списка отзывов.
 * @function
 * @name List
 * @returns {JSX.Element} React-элемент компонента для отображения списка отзывов.
 */
const List = () => {
  const { dispatch, feedback, isLoading, isError } = useAppContext();

  /**
   * Обработчик редактирования отзыва.
   * @function
   * @name handleEdit
   * @param {Object} payload - Данные отзыва для редактирования.
   */
  function handleEdit(payload: { id: string, rating: number, title: string }): void {
    dispatch({ type: TYPES.EDIT_FEEDBACK, payload: { isEdit: true, item: payload } });
  }

  /**
   * Обработчик удаления отзыва.
   * @async
   * @function
   * @name handleDelete
   * @param {number} payload - Идентификатор отзыва для удаления.
   */
  async function handleDelete(payload: string): Promise<void> {
    if (confirm('Are you sure?')) {
      dispatch({ type: TYPES.DELETE_FEEDBACK, payload: await actions.delete(payload) });
      dispatch({ type: TYPES.FETCH_FEEDBACK, payload: await actions.fetch() });
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    !isLoading && feedback.length !== 0
      ? (
        <ul className='grid gap-3'>
          {feedback.map((item: { id: string, rating: number, title: string }) =>
            <li key={item.id} className='bg-white border-2 p-2 rounded grid gap-2 dark:bg-neutral-700'>
              <div
                className='w-[40px] h-[40px] rounded-full flex justify-center items-center bg-neutral-500 text-white'>{item.rating}</div>
              <h3 className='font-bold'>{item.title}</h3>
              <div className='grid gap-2 grid-cols-2'>
                <button className='btn border-2 border-blue-400 bg-blue-200 hover:bg-blue-300'
                        onClick={() => handleEdit(item)}>Edit
                </button>
                <button className='btn border-2 border-red-400 bg-red-200 hover:bg-red-300'
                        onClick={() => handleDelete(item.id)}>Delete
                </button>
              </div>
            </li>)}
        </ul>
      )
      : <h3 className='text-3xl text-center font-bold'>No feedbacks</h3>
  );
};

export default List;
