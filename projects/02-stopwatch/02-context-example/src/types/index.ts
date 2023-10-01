/**
 * Интерфейс для представления данных таймера.
 * @interface
 */
export interface Timer {
  counter: number;  // Общее количество секунд
  minutes: number;  // Количество минут
  seconds: number;  // Количество секунд
}

/**
 * Интерфейс для контекста приложения.
 * @interface
 */
export interface AppContextProps {
  timer: Timer;        // Текущее состояние таймера
  handleStart: () => void;  // Функция для запуска таймера
  handlePause: () => void;  // Функция для приостановки таймера
  handleReset: () => void;  // Функция для сброса таймера
}

/**
 * Интерфейс для представления действий (actions) в Redux.
 * @interface
 */
export interface Action {
  type: string;    // Тип действия
  payload?: any;   // Дополнительные данные (опционально)
}
