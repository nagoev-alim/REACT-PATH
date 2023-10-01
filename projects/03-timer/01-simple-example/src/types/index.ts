/**
 * @interface {Object} ITimer
 * @property {number} minutes - Количество минут.
 * @property {number} seconds - Количество секунд.
 * @property {number} timeLeft - Оставшееся время в секундах.
 */
export interface ITimer {
  minutes: number,
  seconds: number,
  timeLeft: number,
}
