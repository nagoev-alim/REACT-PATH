import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Компонент GameCardContainer используется для обертывания контента игровой карточки и применения стилизации.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние элементы, которые будут обернуты компонентом GameCardContainer.
 * @returns {JSX.Element} Обернутый контент с примененной стилизацией.
 */
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow='hidden'>
      {children}
    </Box>
  );
};

export default GameCardContainer;