import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';

/**
 * Компонент GameCardSkeleton представляет собой скелетную карточку игры.
 *
 * @component
 * @returns {JSX.Element} Скелетная карточка игры.
 */
const GameCardSkeleton = () => {
  return (
    <Card>
      {/* Скелетное изображение игры */}
      <Skeleton height='200px' />
      <CardBody>
        {/* Скелетный текст */}
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;