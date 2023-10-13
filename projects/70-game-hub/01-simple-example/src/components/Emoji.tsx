import bullEye from '../assets/img/bulls-eye.webp';
import thumbsUp from '../assets/img/thumbs-up.webp';
import meh from '../assets/img/meh.webp';
import { Image, ImageProps } from '@chakra-ui/react';

interface Props {
  rating: number;
}

/**
 * Компонент Emoji представляет эмодзи, отображающее оценку игры.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.rating - Оценка игры.
 * @returns {JSX.Element | null} Эмодзи в зависимости от оценки игры.
 */
const Emoji = ({ rating }: Props) => {
  if (rating < 3) {
    return null;
  }
  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: 'meh', boxSize: '25px' },
    4: { src: thumbsUp, alt: 'recommended', boxSize: '25px' },
    5: { src: bullEye, alt: 'exceptional', boxSize: '35px' },
  };
  return (
    <Image {...emojiMap[rating]} marginTop={1} />
  );
};

export default Emoji;