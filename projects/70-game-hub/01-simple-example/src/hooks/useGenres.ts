import gentes from '../mock/gentes.ts';

/**
 * Интерфейс для представления жанра игры.
 * @interface Genre
 * @property {number} id - Уникальный идентификатор жанра.
 * @property {string} name - Название жанра.
 * @property {string} image_background - Ссылка на изображение фона жанра.
 */
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

/**
 * Кастомный хук для получения списка жанров.
 *
 * @returns {{data: Genre[], isLoading: boolean, error: null | string}} Объект, содержащий список жанров, состояние загрузки и ошибку (при наличии).
 */
const useGenres = () => ({
  data: gentes,
  isLoading: false,
  error: null,
});

export default useGenres;