import { useAppHook } from '../../context/AppContext.jsx';


const Stats = () => {
  const { feedback } = useAppHook();

  // 🚀 METHODS: ================================
  const average = () => {
    let data = feedback.length === 0 ? 0 : feedback.reduce((acc, { rating }) => acc + parseInt(rating), 0) / feedback.length;
    return data.toFixed(1).replace(/[.,]0$/, '');
  };

  // 🚀 RENDER: ================================
  return <div className='stats h6'>
    <p>{feedback.length} reviews</p>
    <p>Average Rating: {average()}</p>
  </div>;
};

export default Stats;
