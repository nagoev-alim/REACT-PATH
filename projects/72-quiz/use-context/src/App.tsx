import { useEffect } from 'react';
import axios from 'axios';
import { APP_STATES, TYPES } from './utils/constants.ts';
import { useAppContext } from './context/AppContext.tsx';
import {
  Header,
  Loader,
  Error,
  StartScreen,
  Question,
  Progress,
  Footer,
  Timer,
  NextButton,
  FinishScreen, Main,
} from './components';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Quiz".
 */
const App = () => {
  const {questions, status, dispatch} = useAppContext()
  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, currentQuestion) => acc + currentQuestion.points, 0);

  useEffect(function() {
    (async function() {
      try {
        const { data } = await axios.get('http://localhost:8000/questions');
        dispatch({ type: TYPES.dataReceived, payload: data });
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
          dispatch({ type: TYPES.dataFailed });
        }
      }
    })();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === APP_STATES.LOADING && <Loader />}
        {status === APP_STATES.ERROR && <Error />}
        {status === APP_STATES.READY && <StartScreen numOfQuestions={numOfQuestions} />}
        {status === APP_STATES.ACTIVE && (
          <>
            <Progress numOfQuestions={numOfQuestions} totalPoints={totalPoints} />
            <Question />
            <Footer>
              <Timer />
              <NextButton numOfQuestions={numOfQuestions}  />
            </Footer>
          </>
        )}
        {status === APP_STATES.FINISHED && <FinishScreen totalPoints={totalPoints}  />}
      </Main>
    </div>
  );
};

export default App;
