import { Game } from '../hooks/useGames.ts';
import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react';
import { CriticScore, Emoji, PlatformIconList } from './index.ts';
import getCropImageUrl from '../services/image-url.ts';

interface Props {
  game: Game;
}
/**
 * Компонент GameCard представляет информацию о конкретной игре.
 *
 * @component
 * @param {Props} props - Свойства компонента GameCard.
 * @param {Game} props.game - Информация о игре.
 * @returns {JSX.Element} Карточка игры.
 */
const GameCard = ({ game }: Props) => {
  return (
    <Card>
      {/* Изображение игры с обрезанным размером */}
      <Image src={getCropImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent='space-between' marginBottom={3}>
          {/* Список иконок платформ, на которых доступна игра */}
          <PlatformIconList platforms={game.parent_platforms.map(platform => platform.platform)} />
          {/* Оценка игры от критиков */}
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize='2xl'>
          {/* Название игры и эмоджи, отображающие рейтинг игры */}
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;