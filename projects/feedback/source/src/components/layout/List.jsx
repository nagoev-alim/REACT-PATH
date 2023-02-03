import { DELETE_FEEDBACK, EDIT_FEEDBACK, FETCH_FEEDBACK } from '../../context/constant.js';
import { actions } from '../../context/AppActions.js';
import { useAppHook } from '../../context/AppContext.jsx';
import { Error, Loading } from '../index.js';

const List = () => {
  const { dispatch, feedback, isLoading, isError } = useAppHook();

  // 🚀 METHODS: ================================
  const onEdit = (payload) => {
    dispatch({ type: EDIT_FEEDBACK, payload: { isEdit: true, item: payload } });
  };
  const onDelete = async (payload) => {
    if (confirm('Are you sure?')) {
      dispatch({ type: DELETE_FEEDBACK, payload: await actions.delete(payload) });
      dispatch({ type: FETCH_FEEDBACK, payload: await actions.fetch() });
    }
  };

  // 🚀 RENDER: ================================
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return !isLoading && feedback.length !== 0
    ? <ul className='feedbacks'>
      {feedback.map(item =>
        <li key={item.id} className='feedbacks__item'>
          <div className='feedbacks__item-rating h5'>{item.rating}</div>
          <h3 className='h5'>{item.title}</h3>
          <div className='feedbacks__item-buttons'>
            <button className='button button--green' onClick={() => onEdit(item)}>Edit</button>
            <button className='button button--red' onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </li>)}
    </ul>
    : <h3 className='h5 feedbacks__empty'>No feedbacks</h3>;
};

export default List;
