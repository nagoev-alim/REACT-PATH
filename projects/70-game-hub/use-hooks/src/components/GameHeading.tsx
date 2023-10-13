import { Heading } from '@chakra-ui/react';
import { GameQuery } from '../App.tsx';

interface Props {
  gameQuery: GameQuery;
}

/**
 * Компонент GameHeading представляет заголовок страницы, который отображает выбранные фильтры для игр.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {GameQuery} props.gameQuery - Объект, содержащий информацию о текущем запросе игр.
 * @returns {JSX.Element} Заголовок страницы с выбранными фильтрами для игр.
 */
const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.name || ''} ${gameQuery.genre?.name || ''} Games`;
  return (
    <Heading as='h1' marginY={5} fontSize='5xl'>
      {heading}
    </Heading>
  );
};

export default GameHeading;