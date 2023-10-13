import { Badge } from '@chakra-ui/react';

interface Props {
  score: number;
}
/**
 * Компонент CriticScore отображает оценку критиков в виде бейджа с цветом в зависимости от значения оценки.
 *
 * @component
 * @param {Props} props - Свойства компонента CriticScore.
 * @param {number} props.score - Оценка критиков.
 * @returns {JSX.Element} Бейдж с оценкой критиков и цветом, зависящим от оценки.
 */
const CriticScore = ({ score }: Props) => {
  // Определение цвета для бейджа на основе значения оценки
  let color: string = score > 75 ? 'green' : score > 65 ? 'yellow' : '';
  return (
    <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='4px'>
      {score}
    </Badge>
  );
};

export default CriticScore;