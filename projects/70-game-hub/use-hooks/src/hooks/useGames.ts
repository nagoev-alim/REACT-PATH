import useData from './useData.ts';
import { GameQuery } from '../App.tsx';

/**
 * Интерфейс для представления платформы игры.
 * @interface Platform
 * @property {number} id - Уникальный идентификатор платформы.
 * @property {string} name - Название платформы.
 * @property {string} slug - Слаг платформы.
 */
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

/**
 * Интерфейс для представления игры.
 * @interface Game
 * @property {number} id - Уникальный идентификатор игры.
 * @property {string} name - Название игры.
 * @property {string} background_image - Ссылка на изображение фона игры.
 * @property {Array} parent_platforms - Массив родительских платформ игры.
 * @property {number} metacritic - Оценка Metacritic игры.
 * @property {number} rating_top - Топовый рейтинг игры.
 */
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

/**
 * Кастомный хук для получения списка игр из API с учетом фильтров и параметров запроса.
 *
 * @param {GameQuery} gameQuery - Объект запроса игр, содержащий фильтры и параметры запроса.
 * @returns {{data: Game[], error: string, isLoading: boolean}} Объект, содержащий список игр, ошибку и состояние загрузки.
 */
const useGames = (gameQuery: GameQuery) => useData<Game>('/games', {
  params: {
    genres: gameQuery.genre?.id,
    platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText,
  },
}, [gameQuery]);

export default useGames;