import useData from './useData.ts';

/**
 * Интерфейс для представления игровой платформы.
 * @interface Platform
 * @property {number} id - Уникальный идентификатор платформы.
 * @property {string} name - Название платформы.
 * @property {string} slug - Слаг платформы.
 */
interface Platform {
  id: number;
  name: string;
  slug: string;
}

/**
 * Кастомный хук для получения списка игровых платформ.
 *
 * @returns {{data: Platform[], isLoading: boolean, error: null | string}} Объект, содержащий список игровых платформ, состояние загрузки и ошибку (при наличии).
 */
const usePlatforms = () => useData<Platform>('/platforms/lists/parents');

export default usePlatforms;