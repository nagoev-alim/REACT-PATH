import { Platform } from '../hooks/useGames.ts';
import { HStack, Icon } from '@chakra-ui/react';
import { FaAndroid, FaApple, FaLinux, FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendo } from 'react-icons/si';
import { MdPhoneIphone } from 'react-icons/md';
import { BsGlobe } from 'react-icons/bs';
import { IconType } from 'react-icons';

interface Props {
  platforms: Platform[];
}
/**
 * Компонент PlatformIconList отображает иконки платформ, на которых доступна игра.
 *
 * @component
 * @param {Props} props - Свойства компонента PlatformIconList.
 * @param {Platform[]} props.platforms - Список платформ для игры.
 * @returns {JSX.Element} Список иконок платформ.
 */
const PlatformIconList = ({ platforms }: Props) => {
  // Карта иконок платформ
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
  return (
    <HStack marginY={1}>
      {platforms.map(platform => <Icon key={platform.id} as={iconMap[platform.slug]} color='gray.500' />)}
    </HStack>
  );
};

export default PlatformIconList;