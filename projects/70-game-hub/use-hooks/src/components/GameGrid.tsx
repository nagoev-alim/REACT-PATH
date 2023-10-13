import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames.ts';
import { GameCard, GameCardContainer, GameCardSkeleton } from './index.ts';
import { GameQuery } from '../App.tsx';

interface Props {
  gameQuery: GameQuery;
}

/**
 * Компонент GameGrid отображает сетку игр с использованием данных, полученных из хука useGames.
 *
 * @component
 * @param {Props} props - Свойства компонента GameGrid.
 * @param {GameQuery} props.gameQuery - Запрос для фильтрации игр.
 * @returns {JSX.Element} Компонент сетки игр.
 */
const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  // Массив с информацией о скелетах для отображения во время загрузки данных
  const skeletons = [1, 2, 3, 4, 5, 6];
  // Если произошла ошибка при загрузке данных, выводим текст ошибки
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <SimpleGrid columns={{
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    }} spacing={6} padding='10px'>
      {/* Вывод скелетов во время загрузки данных */}
      {isLoading && skeletons.map(skeleton => (
        <GameCardContainer key={skeleton}>
          <GameCardSkeleton />
        </GameCardContainer>
      ))}
      {/* Вывод информации об играх */}
      {data.map(game => (
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;