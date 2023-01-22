import Form from './Form.jsx';
import TimerDisplay from './TimerDisplay.jsx';
import { useState } from 'react';

/**
 * @function Countdown
 * @return {JSX.Element}
 * @constructor
 */
const Countdown = () => {
  const [showForm, setShowForm] = useState(true);
  const [timer, setTimer] = useState(null);

  return <>
    <h1 className='title'>{timer !== null ? timer.title : 'Countdown'}</h1>
    <Form setTimer={setTimer} showForm={showForm} setShowForm={setShowForm} />
    {!showForm && timer !== null && <TimerDisplay
      timer={timer}
      targetDate={timer.date}
      setShowForm={setShowForm}
      setTimer={setTimer} />}
  </>;
};

export default Countdown;
