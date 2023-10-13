import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import usePlatforms from '../hooks/usePlatforms.ts';
import { Platform } from '../hooks/useGames.ts';

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

/**
 * Компонент PlatformSelector предоставляет пользователю возможность выбора платформы для игр.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSelectPlatform - Функция обратного вызова, вызываемая при выборе платформы.
 * @param {Platform | null} props.selectedPlatform - Выбранная платформа.
 * @returns {JSX.Element} Выпадающее меню для выбора платформы.
 */
const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data, error } = usePlatforms();
  if (error) {
    return null;
  }
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || 'Platform'}
      </MenuButton>
      <MenuList>
        {data.map(platform => (
          <MenuItem onClick={() => onSelectPlatform(platform)} key={platform.id}>{platform.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;