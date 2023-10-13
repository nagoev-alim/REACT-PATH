interface IMovieProps {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  onSelected: (record: string) => void;
}
/**
 * Компонент для отображения информации о фильме.
 *
 * @param {IMovieProps} props - Пропсы компонента.
 * @param {string} props.imdbID - Уникальный идентификатор фильма.
 * @param {string} props.Poster - URL постера фильма.
 * @param {string} props.Title - Название фильма.
 * @param {string} props.Year - Год выпуска фильма.
 * @param {Function} props.onSelected - Функция-обработчик выбора фильма.
 * @returns {JSX.Element} Возвращает JSX-разметку для отображения информации о фильме.
 */
const Movie = ({ imdbID, Poster, Title, Year, onSelected }: IMovieProps) => {
  return (
    <li key={imdbID} onClick={() => onSelected(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
