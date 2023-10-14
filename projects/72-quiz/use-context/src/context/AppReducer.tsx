import { Action, IAppState } from '../types';
import { APP_STATES, SECS_PER_QUESTION, TYPES } from '../utils/constants.ts';

/**
 * Редуктор для управления состоянием.
 * @param {IAppState} state - Текущее состояние.
 * @param {Action} action - Действие для изменения состояния.
 * @returns {IAppState} Новое состояние.
 */
export const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case TYPES.dataReceived:
      // Данные успешно получены, устанавливаем вопросы и переходим в состояние "готов".
      return {
        ...state,
        questions: action.payload,
        status: APP_STATES.READY,
      };
    case TYPES.dataFailed:
      // Возникла ошибка при получении данных, переходим в состояние "ошибка".
      return {
        ...state,
        status: APP_STATES.ERROR,
      };
    case TYPES.start:
      // Начинаем викторину, переходим в состояние "активно" и устанавливаем таймер.
      return {
        ...state,
        status: APP_STATES.ACTIVE,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case TYPES.newAnswer:
      // Ответ на вопрос сохраняется, подсчитываем баллы.
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case TYPES.nextQuestion:
      // Переходим к следующему вопросу и сбрасываем ответ.
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case TYPES.finish:
      // Завершаем викторину и обновляем рекорд баллов, если он установлен.
      return {
        ...state,
        status: APP_STATES.FINISHED,
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case TYPES.restart:
      // Перезапускаем викторину, возвращаемся к начальному состоянию "готов".
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        secondsRemaining: null,
        questions: state.questions,
        status: APP_STATES.READY,
      };
    case TYPES.time:
      // Уменьшаем оставшееся время и переходим в состояние "завершено", если время истекло.
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? APP_STATES.FINISHED : state.status,
      };
    default:
      return state;
  }
};
